import React from 'react';
import { describe, it, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import { Coin } from '../api/coins';
import CoinListItem from './CoinListItem';
import * as globalStateHooks from '../global-state/hooks';
import { ActionType } from '../global-state/types';

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

    it.skip('should display the sterling coin price when it is available', () => {
        render(<CoinListItem coin={coin} coinPrice={coinPrice} isFavourite={false} />);
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

    it.skip('should toggle the coin as a favourite when the star icon is clicked', () => {
        const mockDispatch = vi.fn();
        const useDispatchSpy = vi.spyOn(globalStateHooks, 'useDispatch');
        useDispatchSpy.mockReturnValue(mockDispatch);

        render(<CoinListItem coin={coin} isFavourite={false} />);
        fireEvent.click(screen.getByRole('button', { name: 'favourite coin' }));

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith({ type: ActionType.ToggleActiveCoinCode, payload: 'BTC' });
    });
});
