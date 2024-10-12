export function getNumberRangeArray(start: number, end: number) {
    return Array.from(Array(end - start + 1).keys()).map((key) => start + key);
}
