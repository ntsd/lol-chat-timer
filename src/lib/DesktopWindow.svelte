<script lang="ts">
	import { GITHUB_LINK, WINDOWS_NAMES } from '../consts';
	import { createWindowDragHandler } from '../utils/createWindowDragHandler';
	import { getWindow } from '../utils/getWindow';
	// @ts-ignore
	import Document from './Document.md';

	const { onDragStart, onMouseMove } = createWindowDragHandler(WINDOWS_NAMES.DESKTOP);

	function openGithub() {
		overwolf.utils.openUrlInDefaultBrowser(GITHUB_LINK);
	}

	async function minimizeWindow() {
		(await getWindow(WINDOWS_NAMES.DESKTOP)).minimize();
	}

	async function closeWindow() {
		(await getWindow(WINDOWS_NAMES.DESKTOP)).close();
	}
</script>

<div class="flex flex-col h-screen max-h-screen">
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<header class="header cursor-move" on:mousedown={onDragStart} on:mousemove={onMouseMove}>
		<h3 class="header-title">Desktop Window</h3>
		<div class="window-controls-group">
			<button
				class="icon window-control"
				on:click={() => (window.location.href = 'overwolf://settings')}
			>
				<svg viewBox="0 0 30 30">
					<path
						d="M22,16.3V13.7H19.81a4.94,4.94,0,0,0-.49-1.18L20.87,11,19,9.13l-1.55,1.55a5,5,0,0,0-1.18-.49V8H13.7v2.19a5,5,0,0,0-1.18.49L11,9.13,9.13,11l1.55,1.55a5,5,0,0,0-.49,1.18H8v2.6h2.19a5,5,0,0,0,.49,1.18L9.13,19,11,20.87l1.55-1.55a4.94,4.94,0,0,0,1.18.49V22h2.6V19.81a4.94,4.94,0,0,0,1.18-.49L19,20.87,20.87,19l-1.55-1.55a4.94,4.94,0,0,0,.49-1.18Zm-7,1.45A2.75,2.75,0,1,1,17.75,15,2.75,2.75,0,0,1,15,17.75Z"
						fill="currentcolor"
					/>
				</svg>
			</button>
			<button class="icon window-control" on:click={() => openGithub()}>
				<svg viewBox="0 0 30 30">
					<rect x="13.5" y={19} width={2} height={2} fill="currentcolor" />
					<path
						d="M16.5,9H12v1h4.5A1.5,1.5,0,0,1,18,11.5v1A1.5,1.5,0,0,1,16.5,14H14v3h1V15h1.5A2.5,2.5,0,0,0,19,12.5v-1A2.5,2.5,0,0,0,16.5,9Z"
						fill="currentcolor"
					/>
				</svg>
			</button>
			<button
				class="icon window-control"
				on:click={() => {
					minimizeWindow();
				}}
			>
				<svg viewBox="0 0 30 30">
					<line x1={10} y1="19.5" x2={20} y2="19.5" fill="none" stroke="currentcolor" />
				</svg>
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
	</header>
	<div class="container p-4 h-full prose lg:prose-xl overflow-y-auto overflow-x-clip">
		<Document />
	</div>
</div>
