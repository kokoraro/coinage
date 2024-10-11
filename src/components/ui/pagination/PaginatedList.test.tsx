import { vi, describe, it, Mock, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import PaginatedList from './PaginatedList';

const dummyDataArray = Array.from({ length: 10 }, (_, i) => i);

describe('PaginatedList', () => {
    let renderItem: Mock<[{ item: number }], JSX.Element>;

    beforeEach(() => {
        vi.resetAllMocks();
        renderItem = vi.fn(({ item }) => <div key={item}>{`item ${item}`}</div>);
    });

    it('should render the correct number of items based on itemsPerPage prop', () => {
        render(<PaginatedList data={dummyDataArray} renderItem={renderItem} itemsPerPage={3} />);
        expect(renderItem).toHaveBeenCalledTimes(3);
    });

    it('should set the first rendered page as selected by default', () => {
        render(<PaginatedList data={dummyDataArray} renderItem={renderItem} itemsPerPage={3} />);
        expect(screen.getByRole('button', { name: 'selected page' })).toBeTruthy();
        expect(screen.getByText('item 0')).toBeTruthy();
    });

    it('should render the correct number of pagination buttons based on the total number of pages', () => {
        render(<PaginatedList data={dummyDataArray} renderItem={renderItem} itemsPerPage={3} />);
        expect(screen.queryAllByRole('button', { name: /select page/ })).toHaveLength(3);
    });

    it('should call the onChangePage prop with the correct new page index when a pagination button is clicked', () => {
        render(<PaginatedList data={dummyDataArray} renderItem={renderItem} itemsPerPage={3} />);
        fireEvent.click(screen.getByRole('button', { name: 'select page 2' }));
        expect(screen.getByText('item 3')).toBeTruthy();
    });
});
