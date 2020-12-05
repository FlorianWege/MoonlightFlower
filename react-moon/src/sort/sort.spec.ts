import { bubbleSort, Comparator, combSort } from "./sort";

const numberComparator: Comparator<number> = (a: number, b: number) => {
    return a > b ? 1 : (a < b ? -1 : 0);
}

describe('', () => {
  it('', () => {
      expect(bubbleSort([1, 7, 5, 4, 9, 2], numberComparator)).toStrictEqual([1, 2, 4, 5, 7, 9]);
      expect(bubbleSort([1, 7, 1, 7, 9, 2], numberComparator)).toStrictEqual([1, 1, 2, 7, 7, 9]);
  })

  it('', () => {
    expect(combSort([1, 7, 5, 4, 9, 2], numberComparator)).toStrictEqual([1, 2, 4, 5, 7, 9]);
    expect(combSort([1, 7, 1, 7, 9, 2], numberComparator)).toStrictEqual([1, 1, 2, 7, 7, 9]);
  })
});