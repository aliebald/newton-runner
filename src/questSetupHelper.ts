/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
export default function convertDataArray(array: Array<number>): Array<{ y: number }> {
	const ret = [];
	for (let i = 0; i < array.length; i++) {
		ret.push({ y: array[i] });
	}
	return ret;
}

export function goDown(object: any, yEnd: number): void {
	if (object.y + 10 < yEnd) {
		object.setVelocityY(100);
	} else if (object.y + 4 < yEnd) {
		object.setVelocityY(50);
	} else if (object.y + 2 < yEnd) {
		object.setVelocityY(20);
	} else if (object.y + 1 < yEnd) {
		object.setVelocityY(10);
	} else if (object.y < yEnd) {
		object.setVelocityY(2.5);
	} else {
		object.setVelocityY(0);
	}
}

export function goUp(object: any, yEnd: number): void {
	if (object.y > yEnd + 10) {
		object.setVelocityY(-100);
	} else if (object.y > yEnd + 4) {
		object.setVelocityY(-50);
	} else if (object.y > yEnd + 2) {
		object.setVelocityY(-20);
	} else if (object.y > yEnd + 1) {
		object.setVelocityY(-10);
	} else if (object.y > yEnd) {
		object.setVelocityY(-2.5);
	} else {
		object.setVelocityY(0);
	}
}

export function goDownSlow(object: any, yEnd: number) {
	if (object.y + 10 < yEnd) {
		object.setVelocityY(35);
	} else if (object.y + 4 < yEnd) {
		object.setVelocityY(17.5);
	} else if (object.y + 2 < yEnd) {
		object.setVelocityY(8.5);
	} else if (object.y + 1 < yEnd) {
		object.setVelocityY(4);
	} else if (object.y < yEnd) {
		object.setVelocityY(2);
	} else {
		object.setVelocityY(0);
	}
}

export function goUpSlow(object: any, yEnd: number) {
	if (object.y > yEnd + 10) {
		object.setVelocityY(-35);
	} else if (object.y > yEnd + 4) {
		object.setVelocityY(-17.5);
	} else if (object.y > yEnd + 2) {
		object.setVelocityY(-8.5);
	} else if (object.y > yEnd + 1) {
		object.setVelocityY(-4);
	} else if (object.y > yEnd) {
		object.setVelocityY(-2);
	} else {
		object.setVelocityY(0);
	}
}

export function goLeft(object: any, xEnd: number) {
	if (object.x > xEnd + 10) {
		object.setVelocityX(-100);
	} else if (object.x > xEnd + 4) {
		object.setVelocityX(-50);
	} else if (object.x > xEnd + 2) {
		object.setVelocityX(-20);
	} else if (object.x > xEnd + 1) {
		object.setVelocityX(-10);
	} else if (object.x > xEnd) {
		object.setVelocityX(-2.5);
	} else {
		object.setVelocityX(0);
	}
}

export function goRight(object: any, xEnd: number) {
	if (object.x + 10 < xEnd) {
		object.setVelocityX(100);
	} else if (object.x + 4 < xEnd) {
		object.setVelocityX(50);
	} else if (object.x + 2 < xEnd) {
		object.setVelocityX(20);
	} else if (object.x + 1 < xEnd) {
		object.setVelocityX(10);
	} else if (object.x < xEnd) {
		object.setVelocityX(2.5);
	} else {
		object.setVelocityX(0);
	}
}
