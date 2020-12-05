export function duplicateEncode(word: string) {
    const chars = word.split('').map(c => c.toLowerCase());
    const count: Record<string, number> = {};
    chars.forEach(c => {
      count[c] = (count[c] || 0) + 1;
    });
    return chars.map(c => count[c] > 1 ? ')' : '(').join('');
}