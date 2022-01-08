export const kAry = (
	g: number,
	eNum: number,
	k: number,
	n: number,
	onAssign: (newA: number, g: number) => void,
	onSquaring: (newA: number, oldA: number, n: number, k: number) => void,
	onMultiplication: (newA: number, oldA: number, g: number, n: number) => void
) => {
	const e = eNum
		.toString(2 ** k)
		.split('')
		.map((s) => parseInt(s, 2 ** k))
		.reverse();
	const t = e.length - 1;
	console.log(e);

	//precomputation
	const gArr = [];
	gArr[0] = 1;
	for (let i = 1; i <= 2 ** k - 1; i++) {
		gArr[i] = (gArr[i - 1] * g) % n;
	}

	let A = gArr[e[t]];
	onAssign(A, gArr[e[t]]);

	for (let i = t - 1; i >= 0; i--) {
		{
			const newA = A ** (2 ** k) % n;
			for (let j = 1; j <= k; j++) {
				onSquaring(newA, A, n, k);
			}
			A = newA;
		}

		{
			const newA = (A * gArr[e[i]]) % n;
			console.log('mul', i, e[i]);
			onMultiplication(newA, A, gArr[e[i]], n);
			A = newA;
		}
	}

	return A;
};
