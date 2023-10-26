import { getWindow } from './getWindow';

interface MousePostion {
	x: number;
	y: number;
}

interface PositionEvent {
	clientX: number;
	clientY: number;
}

export function createWindowDragHandler(windowName: string) {
	let windowId: string | null = null;

	getWindow(windowName).then((window) => {
		windowId = window.id;
	});

	const SIGNIFICANT_MOUSE_MOVE_THRESHOLD = 1;
	let mousePosition: MousePostion | null = null;
	let isMouseDown: boolean = false;

	function onDragStart({ clientX, clientY }: PositionEvent) {
		isMouseDown = true;
		mousePosition = {
			x: clientX,
			y: clientY
		};
	}

	function isSignificantMouseMove({ clientX, clientY }: PositionEvent) {
		if (!mousePosition) return false;

		const diffX = Math.abs(clientX - mousePosition.x);
		const diffY = Math.abs(clientY - mousePosition.y);
		const isSignificant =
			diffX > SIGNIFICANT_MOUSE_MOVE_THRESHOLD || diffY > SIGNIFICANT_MOUSE_MOVE_THRESHOLD;

		return isSignificant;
	}

	function onMouseMove(event: PositionEvent) {
		if (!isMouseDown || !isSignificantMouseMove(event)) return;
		isMouseDown = false;
		if (windowId) {
			overwolf.windows.dragMove(windowId);
		}
	}

	return { onDragStart, onMouseMove };
}
