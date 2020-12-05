import {absn} from "../../abs/abs";

export const euclid = (a: bigint, b: bigint): bigint => {
  a = absn(a);
  b = absn(b);

  while (b != 0n) {
    const r = a % b;
    a = b;
    b = r;
  }

  return a;
}

export default (...nums: bigint[]): bigint => {
  return nums.reduce(euclid);
};
