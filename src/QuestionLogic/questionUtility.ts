export function equal(array1: Array<boolean>, array2: Array<boolean>): boolean {
	if (array1.length == array2.length) {
		for (let i = 0; i < array1.length; i++) {
			if (array1[i] != array2[i]) {
				return false;
			}
		}
		return true;
	} else return false;
}
