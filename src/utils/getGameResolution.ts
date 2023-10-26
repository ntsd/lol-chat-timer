export async function getGameResolution(): Promise<{
	width: number;
	height: number;
}> {
	return new Promise((resolve, reject) => {
		overwolf.games.getRunningGameInfo((result) => {
			if (result && result.width) {
				resolve({
					width: result.width,
					height: result.height
				});
				return;
			}

			reject(null);
		});
	});
}
