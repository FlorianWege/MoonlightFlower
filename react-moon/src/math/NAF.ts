export const bin_to_naf = (e: number): number[] => {
	let X = e;
	let i = 0;
	let out: number[] = [];
	while (X >= 1) {
		if (X % 2 === 1) {
			out[i] = 2 - (X % 4);
			X -= out[i];
		} else {
			out[i] = 0;
		}

		X /= 2;
		i++;
	}

	return out.reverse();
};
