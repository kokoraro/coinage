import { describe, it } from 'vitest';
import { divideDataIntoSubArrays, getNumberRangeArray } from '.';

describe('utils index', () => {
    describe('divideDataIntoSubArrays', () => {
        it('should divide data into sub arrays of the specified size', () => {
            const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const result = divideDataIntoSubArrays(data, 3);
            expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
        });

        it('should divide data into sub arrays of size 50 by default', () => {
            const data = Array.from({ length: 100 }, (_, i) => i);
            const result = divideDataIntoSubArrays(data);
            expect(result.length).toBe(2);
            expect(result[0].length).toBe(50);
            expect(result[1].length).toBe(50);
        });

        it('should return an empty array when passed an empty array', () => {
            const data = [] as number[];
            const result = divideDataIntoSubArrays(data);
            expect(result).toEqual([]);
        });
    });

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
});
