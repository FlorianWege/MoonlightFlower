export type Comparator<T> = (a: T, b: T) => number;

export const bubbleSort = <T>(nums: T[], comparator: Comparator<T>) => {
    for (let n=nums.length; n>1; --n) {
        for (let i = 0; i < n - 1; ++i) {
            if (comparator(nums[i], nums[i+1]) > 0) {
                [nums[i], nums[i+1]] = [nums[i+1], nums[i]]
            }
        }
    }
    return nums;
}

export const combSort = <T>(nums: T[], comparator: Comparator<T>) => {
    let step = nums.length;
    let swapped = false;
    do {
        swapped = false;
        for (let i = 0; i <= nums.length - step; i++) {
            if (comparator(nums[i], nums[i + step])) {
                [nums[i], nums[i + step]] = [nums[i + step], nums[i]];
                swapped = true;
            }
        }
        if (step > 1) {
            step = Math.floor(step / 1.3);
        }
    } while (swapped || step > 1);
    return nums;
}