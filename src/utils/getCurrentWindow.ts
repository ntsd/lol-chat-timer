export const getCurrentWindow = (): Promise<overwolf.windows.WindowInfo> => {
	return new Promise((resolve) =>
		overwolf.windows.getCurrentWindow((result) => {
			resolve(result.window);
		})
	);
};
