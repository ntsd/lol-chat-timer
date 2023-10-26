export async function setWindowPosition(windowId: string, left: number, top: number) {
	return new Promise<void>((resolve, reject) => {
		overwolf.windows.changePosition(windowId, left, top, (result) => {
			if (result.success) {
				resolve();
				return;
			}
			reject(result.error);
		});
	});
}
