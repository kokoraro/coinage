import { describe, it, vi } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Header from './Header';
import { render } from '@/test/testUtils';
import * as reactQuery from 'react-query';
import queryKeys from '@/config/query-keys';

describe('Header component', () => {
    it('toggling between favourites change full list to active', () => {
        render(<Header />);
        expect(screen.getByTestId('favourites-active')).toBeDefined();
        fireEvent.click(screen.getByText('Favourites'));
        expect(screen.getByTestId('full-list-active')).toBeDefined();
        expect(screen.getByTestId('favourites')).toBeDefined();
    });

    it('currency is toggled when currency control is clicked', () => {
        render(<Header />);
        expect(screen.getByTestId('pound-sign')).toBeDefined();
        fireEvent.click(screen.getByTestId('pound-sign'));
        expect(screen.getByTestId('dollar-sign')).toBeDefined();
    });

    it('news and coin price is refetched when refresh control is clicked', () => {
        const invalidateQueriesMock = vi.fn();
        vi.spyOn(reactQuery, 'useQueryClient').mockReturnValue({ invalidateQueries: invalidateQueriesMock } as any);
        render(<Header />);
        fireEvent.click(screen.getByTestId('sync'));
        expect(invalidateQueriesMock).toHaveBeenCalledTimes(1);
        expect(invalidateQueriesMock).toHaveBeenCalledWith([queryKeys.news, queryKeys.coinPrices]);
    });
});
