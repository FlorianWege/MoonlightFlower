export function findNb(m: number): number {
	let n = 0;
	let sum;
	while (true) {
		const arr = Array.from(new Array(n).keys());
		console.log(arr);
		sum = arr.reduce((acc: number, a: number) => acc + a * a * a, 0);
		if (sum >= m) {
			break;
		}
		n++;
	}
	return sum === m ? n : -1;
}
