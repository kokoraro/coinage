import { describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PaginationControl from './PaginationControl';

describe('PaginationControl', () => {
    it('displays the correct number of pages', () => {
        render(<PaginationControl currentPageIndex={0} totalPages={10} onChangePage={vi.fn()} />);
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('displays ellipses when necessary', () => {
        const totalPages = 10;
        render(<PaginationControl currentPageIndex={3} totalPages={totalPages} onChangePage={vi.fn()} />);
        expect(screen.getByText('...')).toBeInTheDocument();
    });

    it('calls the onChangePage callback with the correct new page index when a page number is clicked', () => {
        const onChangePageMock = vi.fn();
        const { getByText } = render(<PaginationControl currentPageIndex={3} totalPages={10} onChangePage={onChangePageMock} />);
        fireEvent.click(getByText('4'));
        expect(onChangePageMock).toHaveBeenCalledWith(3);
    });

    it('calls the onChangePage callback with the correct new page index when the "prev" arrow is clicked', () => {
        const onChangePageMock = vi.fn();
        render(<PaginationControl currentPageIndex={3} totalPages={10} onChangePage={onChangePageMock} />);
        fireEvent.click(screen.getByRole('button', { name: 'navigate to next page' }));
        expect(onChangePageMock).toHaveBeenCalledWith(4);
    });

    it('calls the onChangePage callback with the correct new page index when the "next" arrow is clicked', () => {
        const onChangePageMock = vi.fn();
        render(<PaginationControl currentPageIndex={3} totalPages={10} onChangePage={onChangePageMock} />);
        fireEvent.click(screen.getByRole('button', { name: 'navigate to previous page' }));
        expect(onChangePageMock).toHaveBeenCalledWith(2);
    });
});
