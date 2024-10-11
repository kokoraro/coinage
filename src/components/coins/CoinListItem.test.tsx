import { describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Coin } from '../api/coins';
import CoinListItem from './CoinListItem';
import { TestProvider } from '../../test/StoreTestProviders';
import { isCurrencyDollarAtom } from '../../store/global';

const coin = {
    id: 'BTC',
    code: 'BTC',
    name: 'Bitcoin',
    imageURL: null,
} as unknown as Coin;

const coinPrice = {
    GBP: '666',
    USD: '999',
};

describe('CoinListItem', () => {
    it('should display the coin code', () => {
        render(<CoinListItem coin={coin} isFavourite={false} />);
        expect(screen.getByText('BTC')).toBeTruthy();
    });

    it('should display the coin name', () => {
        render(<CoinListItem coin={coin} isFavourite={false} />);
        expect(screen.getByText('Bitcoin')).toBeTruthy();
    });

    it('should display the dollar coin price when it is available', () => {
        render(<CoinListItem coin={coin} coinPrice={coinPrice} isFavourite={false} />);
        expect(screen.getByText('$999.00')).toBeTruthy();
    });

    it('should display the sterling coin price when it is available', () => {
        render(
            <TestProvider initialValues={[[isCurrencyDollarAtom, false]]}>
                <CoinListItem coin={coin} coinPrice={coinPrice} isFavourite={false} />
            </TestProvider>,
        );
        expect(screen.getByText('£666.00')).toBeTruthy();
    });

    it('should display a star icon when the coin is not a favourite', () => {
        render(<CoinListItem coin={coin} isFavourite={false} />);
        expect(screen.getByRole('button', { name: 'favourite coin' })).toBeTruthy();
    });

    it('should display a filled star icon when the coin is a favourite', () => {
        render(<CoinListItem coin={coin} isFavourite={true} />);
        expect(screen.getByRole('button', { name: 'unfavourite coin' })).toBeTruthy();
    });
});
