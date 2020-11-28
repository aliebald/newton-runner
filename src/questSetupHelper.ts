export default function convertDataArray(array: Array<number>): Array<{ y: number }> {
	const ret = [];
	for (let i = 0; i < array.length; i++) {
		ret.push({ y: array[i] });
	}
	return ret;
}
