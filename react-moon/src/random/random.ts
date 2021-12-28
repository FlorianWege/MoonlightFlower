const coinToss = (): number => {
	return Math.random() < 0.5 ? 0 : 1;
};

export default (d: number): number | undefined => {
	const n = Math.floor(Math.log2(d)) + 1;
	let r = 0;
	for (let i = 0; i < n; i++) {
		r = 2 * r + coinToss();
	}
	if (r < d) {
		return r;
	} else {
		return undefined;
	}
};
