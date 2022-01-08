export const sam = (
	g: number,
	eNum: number,
	n: number,
	onAssign: (newA: number, g: number) => void,
	onSquaring: (newA: number, oldA: number, n: number) => void,
	onMultiplication: (newA: number, oldA: number, g: number, n: number) => void
) => {
	const e = eNum
		.toString(2)
		.split('')
		.map((s) => parseInt(s, 2))
		.reverse();
	const l = e.length - 1;

	let A = g;
	onAssign(A, g);

	for (let i = l - 1; i >= 0; i--) {
		const newA = (A * A) % n;
		onSquaring(newA, A, n);
		A = newA;
		if (e[i] === 1) {
			const newA = (A * g) % n;
			onMultiplication(newA, A, g, n);
			A = newA;
		}
	}

	return A;
};
