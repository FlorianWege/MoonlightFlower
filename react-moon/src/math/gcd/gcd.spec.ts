import gcd from './gcd';

describe('gcd tests', () => {
  it('gcd', () => {
    expect(gcd(2n, 5n)).toBe(1n);
    expect(gcd(18n, 30n)).toBe(6n);
    expect(gcd(-10n, 20n)).toBe(10n);
    expect(gcd(-20n, -14n)).toBe(2n);
    expect(gcd(12n, 0n)).toBe(12n);
    expect(gcd(0n, 0n)).toBe(0n);
  });
});
