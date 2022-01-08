export const slidingWindow = (
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
	gArr[1] = g;
	gArr[2] = (g * g) % n;
	for (let i = 1; i <= 2 ** (k - 1) - 1; i++) {
		gArr[2 * i + 1] = (gArr[2 * i - 1] * gArr[2]) % n;
	}

	let A = 1;
	onAssign(A, 1);

	for (let i = t; i >= 0; i--) {
		let u = 0;
		const bits = e[i]
			.toString(2)
			.split('')
			.map((s) => parseInt(s, 2))
			.reverse();
		for (let i = bits.length - 1; i >= 0 && bits[i] !== 0; i--) {
			u++;
		}
		const h = k - u;

		{
			const newA = A ** (2 ** u) % n;
			for (let j = 1; j <= u; j++) {
				onSquaring(newA, A, n, u);
			}
			A = newA;
		}

		{
			const newA = (A * gArr[u]) % n;
			console.log('mul', i, e[i]);
			onMultiplication(newA, A, gArr[e[i]], n);
			A = newA;
		}

		{
			const newA = A ** (2 ** h) % n;
			for (let j = 1; j <= h; j++) {
				onSquaring(newA, A, n, h);
			}
			A = newA;
		}
	}

	return A;
};
