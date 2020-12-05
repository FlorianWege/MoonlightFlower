import palindrome from "./palindrome";

describe('', () => {
    it('', () => {
        expect(palindrome('aba').value).toStrictEqual(true);
        expect(palindrome('abba').value).toStrictEqual(true);
        expect(palindrome('').value).toStrictEqual(false);
        expect(palindrome('abc')).toStrictEqual({value: false, reversedStr: 'cba'});
    });
});
