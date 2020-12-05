function fibonacci(pos) {
	if (pos == 1 || pos == 2) {
		return 1;
	}

	return fibonacci(pos-1) + fibonacci(pos-2);
};

function mat_mult(a, b) {
}