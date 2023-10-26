type Behavior = 'minimize' | 'maximize' | 'restore' | 'close' | 'bringToFront';
type WindowBehavior = Record<Behavior, () => Promise<overwolf.windows.WindowIdResult>>;
type WindowInfo = overwolf.windows.WindowInfo & WindowBehavior;

const actions: Behavior[] = ['minimize', 'maximize', 'restore', 'close', 'bringToFront'];

function obtainWindow(name: string): Promise<overwolf.windows.WindowInfo> {
	return new Promise((resolve, reject) => {
		overwolf.windows.obtainDeclaredWindow(name, (response) => {
			if (!response.success) reject(response);
			resolve(response.window);
		});
	});
}

function standardWindowBehavior(
	id: string,
	behavior: Behavior
): Promise<overwolf.windows.WindowIdResult> {
	return new Promise((resolve, reject) => {
		overwolf.windows[behavior](id, (result) => {
			if (result.success) resolve(result);
			else reject(result);
		});
	});
}

export async function getWindow(name: string): Promise<WindowInfo> {
	const { id, ...windowInfo } = await obtainWindow(name);
	if (!id) {
		throw new Error(`Failed to obtain window ${name}`);
	}
	const bindedWindow = standardWindowBehavior.bind(null, id);
	const updatedWindowInfo = actions.reduce((currentAction, action) => {
		currentAction[action] = async () => {
			const actionResult = await bindedWindow(action);
			return actionResult;
		};
		return currentAction;
	}, {} as WindowBehavior);
	return { ...windowInfo, ...updatedWindowInfo, id };
}
