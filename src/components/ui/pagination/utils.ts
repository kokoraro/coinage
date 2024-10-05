import { getNumberRangeArray } from "../../../utils";

export const createPaginationArray = (currentPageNo: number, totalPages: number) => {
    switch (true) {
        // case 1: 1, 2, 3, 4, 5, 6, 7
        case (totalPages < 8):
            return getNumberRangeArray(1, totalPages);

        // case 2: 1, 2, 3, 4, 5 ... 99
        case (currentPageNo < 4):
            return [...getNumberRangeArray(1, 5), null, totalPages];

        // case 3: 1, 2, 3, 4, 5, 6 ... 99
        case (currentPageNo === 4):
            return [...getNumberRangeArray(1, 6), null, totalPages];

        // case 4: 1 ... 3, 4, 5, 6, 7 ... 99
        case (currentPageNo > 4 && currentPageNo < (totalPages - 3)):
            return [1, null, ...getNumberRangeArray(currentPageNo - 2, currentPageNo + 2), null, totalPages];

        // case 5: 1 ... 94, 95, 96, 97, 98, 99
        case (currentPageNo === (totalPages - 3)):
            return [1, null, ...getNumberRangeArray(totalPages - 5, totalPages)];

        // case 6: 1 ... 95, 96, 97, 98, 99
        case (currentPageNo > (totalPages - 3)):
            return [1, null, ...getNumberRangeArray(totalPages - 4, totalPages)];

        default:
            return [];
    }
}