import { useState } from 'react';
import { divideDataIntoSubArrays } from '@/utils/divideDataIntoSubArrays';
import PaginationControl from './PaginationControl';

interface RenderItemProps<T> {
    item: T;
    index: number;
}

interface PaginatedListProps<T> {
    data: T[];
    renderItem: (item: RenderItemProps<T>) => void;
    itemsPerPage?: number;
}

const PaginatedList = <T,>({ data, renderItem, itemsPerPage }: PaginatedListProps<T>): JSX.Element => {
    const [pageIndex, setPageIndex] = useState<number>(0);
    const pages = divideDataIntoSubArrays(data, itemsPerPage);

    return (
        <>
            {pages[pageIndex].map((item, index) => renderItem({ item, index }))}

            <PaginationControl currentPageIndex={pageIndex} totalPages={pages.length} onChangePage={(newPage) => setPageIndex(newPage)} />
        </>
    );
};

export default PaginatedList;
