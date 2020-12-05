export const absn = (num: bigint): bigint => {
    return num < 0 ? -num : num;
}

export default (num: number): number => {
    return num < 0 || Object.is(num, -0) ? -num : +num;
}