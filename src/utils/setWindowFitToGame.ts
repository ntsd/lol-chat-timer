import { getGameResolution } from './getGameResolution';
import { setWindowPosition } from './setWindowPosition';
import { setWindowSize } from './setWindowSize';

export async function setWindowFitToGame(windowId: string) {
	const gameRes = await getGameResolution();

	if (gameRes === null) {
		return;
	}

	await setWindowSize(windowId, gameRes.width, gameRes.height);
	await setWindowPosition(windowId, 0, 0);
}
