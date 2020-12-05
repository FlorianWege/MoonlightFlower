export default (str: string): {
    value: boolean,
    reversedStr: string
} => {
    if (str === '') {
        return {
            value: false,
            reversedStr: ''
        }
    }
    const reversedStr = str.split('').reverse().join('');
    return {
        value: reversedStr === str,
        reversedStr
    };
};
