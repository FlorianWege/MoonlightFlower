import { LinkedList } from '@datastructures-js/linked-list';

export const setCycleDetection = <T>(list: LinkedList<T>): boolean => {
	let curr = list.head();
	const set = new Set();

	while (curr !== undefined) {
		if (set.has(curr)) {
			return true;
		}

		set.add(curr);

		curr = curr.getNext();
	}

	return false;
};
