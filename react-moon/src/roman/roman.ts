export function roman(number: number): string {
    if (number < 1) {
      return '';
    }

    const thousands = Math.floor(number / 1000);
    const hundreds = Math.floor(number % 1000 / 100);
    const tens = Math.floor(number % 100 / 10);
    const ones = Math.floor(number % 10 / 1);
    
    const M: string = 'M';
    const D: string = 'D';
    const C: string = 'C';
    const L: string = 'L';
    const X: string = 'X';
    const V: string = 'V';
    const I: string = 'I';
    
    const thousandsString = M.repeat(thousands);
    const hundredsString = hundreds === 9 ? (C + M) : 
      (hundreds === 4 ? (C + D) : (hundreds < 4 ? C.repeat(hundreds) : D + C.repeat(hundreds - 5)));
    const tensString = tens === 9 ? (X + C) : 
      (tens === 4 ? (X + L) : (tens < 4 ? X.repeat(tens) : L + X.repeat(tens - 5)));
    const onesString = ones === 9 ? (I + X) : 
      (ones === 4 ? (I + V) : (ones < 4 ? I.repeat(ones) : V + I.repeat(ones - 5)));
    
    return thousandsString + hundredsString + tensString + onesString;
}