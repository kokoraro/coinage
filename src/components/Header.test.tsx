import { describe, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import Header from './Header';
import { render } from '@/test/testUtils';
// import * as newsQueryClient from '@/features/news/api/getNews';
// import * as coinQueryClient from '@/features/coin-list/api/coins';
// import { CoinPriceResponse } from '@/features/coin-list';
// import { NewsResult } from '@/features/news';

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

    // it.skip('news and coin price is refetched when refresh control is clicked', () => {
    //     const fetchCoinPriceSpy = vi.spyOn(coinQueryClient, 'fetchCoinPrice').mockResolvedValueOnce({} as CoinPriceResponse);
    //     const fetchNewsSpy = vi.spyOn(newsQueryClient, 'getNews').mockResolvedValueOnce({} as NewsResult);
    //     render(<Header />);
    //     fireEvent.click(screen.getByTestId('sync'));
    //     void waitFor(() => screen.getByTestId('loading-spinner'));
    //     expect(fetchCoinPriceSpy).toHaveBeenCalledTimes(1);
    //     expect(fetchNewsSpy).toHaveBeenCalledTimes(1);
    // });
});
