<script lang="ts">
	import { REQUIRED_FEATURES, WINDOWS_NAMES } from '../consts';
	import { createWindowDragHandler } from '../utils/createWindowDragHandler';
	import { getWindow } from '../utils/getWindow';
	import {
		gameEventAtom,
		setGameEventRequiredFeatures,
		gameInfoAtom,
		setLogLevel
	} from 'overwolf-nanostores';

	const { onDragStart, onMouseMove } = createWindowDragHandler(WINDOWS_NAMES.IN_GAME);

	let minimize = false;

	// remove this in production to not display debug log
	setLogLevel('debug');

	// set require event features
	setGameEventRequiredFeatures(REQUIRED_FEATURES);

	async function closeWindow() {
		(await getWindow(WINDOWS_NAMES.IN_GAME)).close();
	}
</script>

<div class="flex flex-col h-screen max-h-screen">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="header cursor-move bg-base-100" on:mousedown={onDragStart} on:mousemove={onMouseMove}>
		<h3 class="header-title">In Game Window</h3>
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
	<div class={`flex h-full flex-col p-2 overflow-y-hidden ${minimize && 'hidden'}`}>
		<div class="h-1/2 flex flex-col">
			<div>Events</div>
			<p class="flex-grow textarea bg-transparent w-full overflow-y-auto">
				{JSON.stringify($gameEventAtom)}
			</p>
		</div>
		<div class="h-1/2 flex flex-col">
			<div>Infos</div>
			<p class="flex-grow textarea bg-transparent w-full overflow-y-auto">
				{JSON.stringify($gameInfoAtom)}
			</p>
		</div>
	</div>
</div>
