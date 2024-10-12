import { createPaginationArray } from './createPaginationArray';

describe('createPaginationArray', () => {
    it('should return an array of length 7 when totalPages is less than 8', () => {
        const result = createPaginationArray(1, 7);
        expect(result.length).toEqual(7);
    });

    it('should return an array of consecutive numbers when less than 8 pages', () => {
        const result = createPaginationArray(1, 7);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });

    it('should add truncation to the end if there is more than 7 pages', () => {
        const result = createPaginationArray(1, 8);
        expect(result).toEqual([1, 2, 3, 4, 5, null, 8]);
    });

    it('should return an array with first 6 elements being consecutive numbers when at page 4', () => {
        const result = createPaginationArray(4, 99);
        expect(result).toEqual([1, 2, 3, 4, 5, 6, null, 99]);
    });

    it('should add truncation either side if current page is more than 4 and less 3 from the total', () => {
        const result = createPaginationArray(5, 99);
        expect(result).toEqual([1, null, 3, 4, 5, 6, 7, null, 99]);
    });

    it('should add truncation either side if current page is more than 4 and less 3 from the total different page', () => {
        const result = createPaginationArray(20, 99);
        expect(result).toEqual([1, null, 18, 19, 20, 21, 22, null, 99]);
    });

    it('should only truncate the start when current page is 3 away from total', () => {
        const result = createPaginationArray(96, 99);
        expect(result).toEqual([1, null, 94, 95, 96, 97, 98, 99]);
    });

    it('should truncate more at the start if current page is less than 3 from total', () => {
        const result = createPaginationArray(98, 99);
        expect(result).toEqual([1, null, 95, 96, 97, 98, 99]);
    });

    it('should return and empty array if there is no pages', () => {
        const result = createPaginationArray(0, 0);
        expect(result).toEqual([]);
    });
});
