<script lang="ts">
	import { GAME_ID, LAUNCHER_REQUIRED_FEATURES, WINDOWS_NAMES } from '../consts';
	import { getWindow } from '../utils/getWindow';
	import { runningGameAtom } from 'overwolf-nanostores';
	import { launcherInfoAtom, setLauncherEventRequiredFeatures } from 'overwolf-nanostores';

	runningGameAtom.subscribe((runningGame) => {
		const isGameRunning = runningGame && runningGame.classId === GAME_ID.LOL_GAME;

		if (isGameRunning) {
			getWindow(WINDOWS_NAMES.IN_GAME).then((window) => {
				window.restore();
			});
		} else {
			getWindow(WINDOWS_NAMES.DESKTOP).then((window) => {
				window.restore();
			});
		}
	});

	// close window if the selected game is not LOL (remove if not using)
	// TFT and LOL using the same client
	launcherInfoAtom.subscribe((launcherInfo) => {
		// https://overwolf.github.io/api/live-game-data/supported-launchers/league-of-legends#selected_game-note
		if (
			launcherInfo &&
			launcherInfo.feature === 'game_info' &&
			launcherInfo.key === 'selected_game'
		) {
			if (launcherInfo.value !== 'lol') {
				getWindow(WINDOWS_NAMES.DESKTOP).then((window) => {
					window.close();
				});
			}
		}
	});
	setLauncherEventRequiredFeatures(GAME_ID.LOL_LAUNCHER, LAUNCHER_REQUIRED_FEATURES);
</script>
