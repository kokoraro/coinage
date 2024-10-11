import React from 'react';
import { vi, describe, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import Header from './Header';
import { ActionType, State } from './global-state/types';
import * as globalStateHooks from './global-state/hooks';
import { render } from '../test/testUtils';

import * as newsQueryClient from './api/newsFeed';
import * as coinQueryClient from './api/coins';

describe('Header component', () => {
    it('toggle favourites function is called when favourites control is clicked', () => {
        const mockDispatch = vi.fn();
        const useGlobalStateContextSpy = vi.spyOn(globalStateHooks, 'useGlobalStateContext');
        useGlobalStateContextSpy.mockReturnValue({ dispatch: mockDispatch, state: {} as State });
        render(<Header />);
        fireEvent.click(screen.getByText('Favourites'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: ActionType.ToggleIsFavourites });
    });

    it('currency is toggled when currency control is clicked', () => {
        const mockDispatch = vi.fn();
        const useGlobalStateContextSpy = vi.spyOn(globalStateHooks, 'useGlobalStateContext');
        useGlobalStateContextSpy.mockReturnValue({ dispatch: mockDispatch, state: {} as State });
        render(<Header />);
        fireEvent.click(screen.getByTestId('dollar-sign'));
        expect(mockDispatch).toHaveBeenCalledWith({ type: ActionType.ToggleCurrencyDollar });
    });

    it('news and coin price is refetched when refresh control is clicked', () => {
        const fetchCoinPriceSpy = vi.spyOn(coinQueryClient, 'fetchCoinPrice').mockResolvedValueOnce({} as coinQueryClient.CoinPrice);
        const fetchNewsSpy = vi.spyOn(newsQueryClient, 'fetchNews').mockResolvedValueOnce(null);
        render(<Header />);
        fireEvent.click(screen.getByTestId('sync'));
        void waitFor(() => screen.getByTestId('loading-spinner'));
        expect(fetchCoinPriceSpy).toHaveBeenCalledTimes(1);
        expect(fetchNewsSpy).toHaveBeenCalledTimes(1);
    });
});
