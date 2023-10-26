export async function setWindowSize(windowId: string, width: number, height: number) {
	return new Promise<void>((resolve, reject) => {
		overwolf.windows.changeSize(windowId, width, height, (result) => {
			if (result.success) {
				resolve();
				return;
			}
			reject(result.error);
		});
	});
}
