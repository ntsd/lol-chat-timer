export async function getCurrentWindowSize(): Promise<{
	width: number;
	height: number;
}> {
	return new Promise((resolve) => {
		overwolf.windows.getCurrentWindow((result) => {
			resolve({
				width: result.window.width,
				height: result.window.height
			});
		});
	});
}
