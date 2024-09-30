import React, { Fragment } from 'react';

interface PaginationProps {
    currentPageIndex: number;
    totalPages: number;
    onChangePage: (newPage: number) => void;
}

const Divider = () => <div className="pagination-button"><span>...</span></div>;

const PageNumber = ({ page, onPageClick, active }: { page: number, onPageClick: (page: number) => void, active: boolean }) => (
    <div
        className="pagination-button"
        style={{ backgroundColor: active ? 'red' : '#fff' }}
        onClick={() => onPageClick(page - 1)}
    >
        <span>{page}</span>
    </div>
);

const getNumberRangeArray = (start: number, end: number) => Array
    .from(Array(end - start + 1).keys())
    .map(key => start + key);

const createPageArray = (currentPageNo: number, totalPages: number) => {
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

const Pagination = ({
    currentPageIndex,
    totalPages,
    onChangePage,
}: PaginationProps): JSX.Element => {
    const pages = createPageArray(currentPageIndex + 1, totalPages);

    return (
        <div className="pagination">
            {pages.map((page) => (
                <Fragment>
                    {page ? <PageNumber page={page} onPageClick={onChangePage} active={(currentPageIndex + 1) === page} /> : <Divider />}
                </Fragment>
            ))}
        </div>
    );
}

export default Pagination;
