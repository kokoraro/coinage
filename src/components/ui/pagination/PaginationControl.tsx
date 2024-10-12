import { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPaginationArray } from './createPaginationArray';

interface PaginationControlProps {
    currentPageIndex: number;
    totalPages: number;
    onChangePage: (newPage: number) => void;
}

const Ellipses = () => (
    <div className="pagination-divider">
        <span>...</span>
    </div>
);

const PageNumber = ({ page, onPageClick, active }: { page: number; onPageClick: (page: number) => void; active: boolean }) => (
    <button
        aria-label={active ? 'selected page' : `select page ${page}`}
        className={`button-no-style pagination-button${active ? '_active' : ''}`}
        onClick={() => onPageClick(page - 1)}
    >
        <span>{page}</span>
    </button>
);

const PaginationControl = ({ currentPageIndex, totalPages, onChangePage }: PaginationControlProps): JSX.Element => {
    const pages = createPaginationArray(currentPageIndex + 1, totalPages);

    return (
        <div className="pagination">
            {currentPageIndex > 0 && (
                <button className="button-no-style" aria-label="navigate to previous page" onClick={() => onChangePage(currentPageIndex - 1)}>
                    <FontAwesomeIcon icon="long-arrow-alt-left" className="pagination-icon" />
                </button>
            )}

            {pages.map((page, index) => (
                <Fragment key={index}>
                    {!page ? <Ellipses /> : <PageNumber page={page} onPageClick={onChangePage} active={currentPageIndex + 1 === page} />}
                </Fragment>
            ))}

            {currentPageIndex < totalPages - 1 && (
                <button className="button-no-style" aria-label="navigate to next page" onClick={() => onChangePage(currentPageIndex + 1)}>
                    <FontAwesomeIcon icon="long-arrow-alt-right" className="pagination-icon" />
                </button>
            )}
        </div>
    );
};

export default PaginationControl;
