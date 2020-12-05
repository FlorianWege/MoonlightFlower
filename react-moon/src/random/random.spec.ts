import random from "./random";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): CustomMatcherResult;
      toBeOr(...matcherResults: ((expected: any) => void)[]): CustomMatcherResult;
    }
  }
}

expect.extend({
toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
    return {
        message: () =>
        `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
    };
    } else {
    return {
        message: () =>
        `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
    };
    }
},
});

expect.extend({
    toBeOr(received: any, ...matcherResults: ((expected: any) => void)[]): jest.CustomMatcherResult {
        let messages: string[] = [];
        for (const matcherResult of matcherResults) {
            try {
              const result = matcherResult(received);

              return {
                pass: true,
                message: () => 'pass'
            };
            } catch (e) {
              messages.push(e.message);
            }
        }
        return {
            pass: false,
            message: () => messages.join('\n')
        }
    },
});

describe('', () => {
  it('', () => {
    const arr = Array.from(new Array(100).keys()).map(val => val + 1);
    for (const key of arr) {
      expect(random(key)).toBeOr(
        (received) => expect(received).toBe(undefined),
        (received) => expect(received).toBeWithinRange(0, key - 1)
      );
    }
  })
});
