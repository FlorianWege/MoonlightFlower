import { LinkedList } from '@datastructures-js/linked-list';

export const floydCycleDetection = <T>(list: LinkedList<T>): boolean => {
	let slow = list.head();
	let fast = list.head();

	while (fast !== undefined && fast.hasNext()) {
		slow = slow.getNext();
		fast = fast.getNext().getNext();

		if (slow === fast) {
			return true;
		}
	}

	return false;
};
