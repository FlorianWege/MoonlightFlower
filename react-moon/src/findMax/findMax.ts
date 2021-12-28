import { arrayIndex } from '../util/util';

export const findMax = (...nums: number[]): [number?, arrayIndex?] => {
	if (nums.length < 1) {
		return [undefined, undefined];
	}

	let maxIndex = 0;
	let max = nums[maxIndex];

	for (let i = nums.length; i > 0; i--) {
		if (nums[i] > max) {
			maxIndex = i;
			max = nums[maxIndex];
		}
	}

	return [max, maxIndex];
};

export const findMaxes = (...nums: number[]): [number | undefined, arrayIndex[]] => {
	if (nums.length < 1) {
		return [undefined, []];
	}

	let maxIndexes: arrayIndex[] = [];
	let max = nums[0];

	for (let i = nums.length; i > 0; i--) {
		if (nums[i] > max) {
			maxIndexes = [i];
			max = nums[i];
		} else if (nums[i] == max) {
			maxIndexes.push(i);
		}
	}

	return [max, maxIndexes];
};

export default (
	...nums: number[]
):
	| {
			value: number;
			index: arrayIndex;
	  }
	| undefined => {
	if (nums.length < 1) {
		return undefined;
	}

	let maxIndex = -Infinity;
	let max = -Infinity;

	nums.forEach((num, index) => {
		if (num > max) {
			maxIndex = index;
			max = num;
		}
	});

	return {
		value: max,
		index: maxIndex,
	};
};
