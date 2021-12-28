export function validBraces(braces: string): boolean {
	const closeToOpenBraceMap: Record<string, string> = {
		')': '(',
		']': '[',
		'}': '{',
	};
	const stack: string[] = [];
	for (const brace of braces.split('')) {
		if (['(', '{', '['].includes(brace)) {
			stack.push(brace);
		} else {
			if (closeToOpenBraceMap[brace] === stack[stack.length - 1]) {
				stack.pop();
			} else {
				return false;
			}
		}
	}
	return stack.length === 0;
}
