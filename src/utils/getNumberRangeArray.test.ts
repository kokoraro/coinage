import { getNumberRangeArray } from './getNumberRangeArray';

describe('getNumberRangeArray', () => {
    it('should generate an array of numbers within the specified range', () => {
        const start = 5;
        const end = 10;
        const result = getNumberRangeArray(start, end);
        expect(result).toEqual([5, 6, 7, 8, 9, 10]);
    });

    it('should handle negative numbers', () => {
        const start = -5;
        const end = 5;
        const result = getNumberRangeArray(start, end);
        expect(result).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]);
    });

    it('should handle start and end values that are the same', () => {
        const start = 5;
        const end = 5;
        const result = getNumberRangeArray(start, end);
        expect(result).toEqual([5]);
    });
});
