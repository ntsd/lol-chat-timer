<script lang="ts">
	import { onDestroy } from 'svelte';
	import { REQUIRED_FEATURES, WINDOWS_NAMES } from '../consts';
	import type { ChampionsTimer } from '../types';
	import { createWindowDragHandler } from '../utils/createWindowDragHandler';
	import { getWindow } from '../utils/getWindow';
	import { gameEventAtom, setGameEventRequiredFeatures, setLogLevel } from 'overwolf-nanostores';
	import { champions, championsMap, spells, spellsMap } from '../data/load';

	const { onDragStart, onMouseMove } = createWindowDragHandler(WINDOWS_NAMES.IN_GAME);
	let championsTimer: ChampionsTimer = {};
	let frame: number;

	const spellNames = spells
		.map((s) => s.name)
		// TODO add champions skills and items
		// .concat(['R'])
		// filter unused
		.filter(
			(s) =>
				s &&
				s !== 'Placeholder' &&
				(!s.endsWith('Smite') || s === 'Smite') &&
				!s.endsWith('Mark') &&
				!s.endsWith('King!')
		)
		// Escape special characters
		.map((s) => s.replace(/[()[\]{}*+?^$|#.,\/\\\s-]/g, '\\$&'))
		// Sort for maximal munch
		.sort((a, b) => b.length - a.length)
		.join('|');
	console.log('spellNames', spellNames);

	const regexStr = String.raw`\s\([a-zA-Z\s]*\)\:\s(?<champion>[a-zA-Z\s]*)\s(?<spell>${spellNames})(\\n|$)`;
	console.log('regexStr', regexStr);
	const chatRegex = new RegExp(regexStr, 'g');

	const matches = Array.from(
		String.raw`พิมพ์ /help เพื่อเรียกดูคำสั่งที่ใช้ได้\nสามารถหยุดเกมได้ โดยการพิมพ์ /pause เพื่อหยุดเกม และสามารถพิมพ์ /resume เพื่อเล่นต่อ\nรูน Hextech Flashtraption ของคุณถูกเปลี่ยนกลายเป็น Perfect Timing\ngame_message_Female1Worlds23Enabled\nสามารถเปิด/ปิด เสียงแจ้งเตือนได้ที่ ออปชั่น -> เสียง \n[ทีม] hotcode (Corki): fes \n[ทีม] hotcode (Corki): ff \n[ทีม] hotcode (Corki): df \nhotcode (Corki): Miss Fortune Ghost\nhotcode (Corki): Miss Fortune Heal\nhotcode (Corki): Miss Fortune Flash\nhotcode (Miss Fortune): Corki Heal\nhotcode (Miss Fortune): Corki R`.matchAll(
			chatRegex
		)
	);

	console.log('matches', matches);
	matches.forEach((match) => {
		if (!match.groups) return;
		const championName = match.groups['champion'];
		const spellName = match.groups['spell'];
		console.log('champion', championName, 'spell', spellName);

		const champion = championsMap[championName];
		if (!champion) {
			console.error(`champion ${championName} not found`);
			return;
		}
		let spell = spellsMap[spellName];
		if (spellName === 'R') {
			// TODO get this from champions data
			spell = {
				cooldown: 0,
				description: '',
				gameModes: [],
				iconPath: '',
				id: 99,
				name: 'R',
				summonerLevel: 1
			};
		}
		if (!spell) {
			console.error(`spell ${spellName} not found`);
			return;
		}
		console.log('champion', champion, 'spell', spell);

		const cooldown = spell.cooldown * 1000; // spellName === 'Ghost' ? 10000 : 20000;
		const startAt = Date.now();
		const endAt = startAt + cooldown;
		const countdown = cooldown;
		const championIcon = champion.squarePortraitPath;
		const spellIcon = spell.iconPath;

		if (championsTimer[champion.name]) {
			championsTimer[champion.name].spells[spell.name] = {
				cooldown: cooldown,
				icon: spellIcon,
				startAt: startAt,
				endAt: endAt,
				countdown: countdown
			};
		} else {
			championsTimer[champion.name] = {
				icon: championIcon,
				spells: {
					[spell.name]: {
						cooldown: cooldown,
						icon: spellIcon,
						startAt: startAt,
						endAt: endAt,
						countdown: countdown
					}
				}
			};
		}
	});

	let minimize = false;

	// remove this in production to not display debug log
	setLogLevel('debug');

	async function closeWindow() {
		(await getWindow(WINDOWS_NAMES.IN_GAME)).close();
	}

	gameEventAtom.subscribe((gameEvent) => {
		if (gameEvent && gameEvent.events) {
			gameEvent.events.forEach((ev) => {
				if (ev.name === 'chat') {
					const matches = chatRegex.exec(ev.data);
					if (matches && matches.groups) {
						console.log('matches', matches);
						const champion = matches.groups['champion'];
					}
				}
			});
		}
	});

	// set require event features
	setGameEventRequiredFeatures(REQUIRED_FEATURES);

	(function update() {
		frame = requestAnimationFrame(update);

		const now = Date.now();

		// foreach hero and spell update countdown
		Object.keys(championsTimer).forEach((championName) => {
			Object.keys(championsTimer[championName].spells).forEach((spellName) => {
				const newCountdown = championsTimer[championName].spells[spellName].endAt - now;
				if (newCountdown < 0) {
					delete championsTimer[championName].spells[spellName];
					championsTimer[championName].spells = championsTimer[championName].spells;
					return;
				}
				championsTimer[championName].spells[spellName].countdown = newCountdown;
			});
			if (Object.keys(championsTimer[championName].spells).length == 0) {
				delete championsTimer[championName];
				championsTimer = championsTimer;
			}
		});
	})();
	onDestroy(() => {
		cancelAnimationFrame(frame);
	});
</script>

<div class="flex flex-col h-screen max-h-screen">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="header cursor-move bg-base-100" on:mousedown={onDragStart} on:mousemove={onMouseMove}>
		<h3 class="header-title">LOL Chat Timer</h3>
		<div class="window-controls-group">
			<button
				class="icon window-control"
				on:click={() => {
					minimize = !minimize;
					console.log('minimize', minimize);
				}}
			>
				{#if minimize}
					<svg viewBox="0 0 30 30">
						<line x1={10} y1="15" x2={20} y2="15" fill="none" stroke="currentcolor" />
						<line x1={15} y1="10" x2={15} y2="20" fill="none" stroke="currentcolor" />
					</svg>
				{:else}
					<svg viewBox="0 0 30 30">
						<line x1={10} y1="15" x2={20} y2="15" fill="none" stroke="currentcolor" />
					</svg>
				{/if}
			</button>
			<button
				class="icon window-control window-control-close"
				on:click={() => {
					closeWindow();
				}}
			>
				<svg viewBox="0 0 30 30">
					<line x1="19.5" y1="10.5" x2="10.5" y2="19.5" fill="none" stroke="currentcolor" />
					<line x1="10.5" y1="10.5" x2="19.5" y2="19.5" fill="none" stroke="currentcolor" />
				</svg>
			</button>
		</div>
	</div>
	<div class={`flex h-full flex-col p-1 overflow-y-hidden ${minimize && 'hidden'}`}>
		{#each Object.entries(championsTimer) as [championName, championTimer]}
			<div class="grid grid-cols-3 gap-1">
				<img
					class="col-span-1 w-full h-auto aspect-square"
					alt={championName}
					src={championTimer.icon}
				/>
				<div class="col-span-2 grid grid-cols-2 gap-1">
					{#each Object.entries(championTimer.spells) as [spellName, spellTimer]}
						<div
							class="skill"
							style={`--time-left:${
								Math.round((spellTimer.countdown / spellTimer.cooldown) * 10000) / 100
							}%`}
						>
							<img class="absolute w-full h-auto" alt={spellName} src={spellTimer.icon} />
							<div class="absolute flex w-full h-full z-20">
								<div class="m-auto" style="font-size: 2em;">
									{Math.round(spellTimer.countdown / 1000)}
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.skill {
		position: relative;
		border: 1px solid #36393e;
		border-radius: 5%;
		overflow: hidden;
		cursor: pointer;
		aspect-ratio: 1 / 1;
	}

	.skill::before {
		content: '';
		background: conic-gradient(
			rgba(0, 0, 0, 0.7) var(--time-left),
			rgba(0, 0, 0, 0.1) var(--time-left)
		);
		position: absolute;
		opacity: 0.8;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 1;
	}
</style>
