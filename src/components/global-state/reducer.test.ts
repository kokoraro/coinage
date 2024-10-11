import { Reducer } from './reducer';
import { DEFAULT_FAVOURITE_COINS } from '../../utils/config';
import { Action, ActionType, State } from './types';

describe('reducer', () => {
    let initialState: State;

    beforeEach(() => {
        initialState = {
            activeCoinCodes: DEFAULT_FAVOURITE_COINS,
            isFavouritesView: true,
            isCurrencyDollar: true,
        };
    });

    it('should toggle active coin code correctly', () => {
        const action: Action = {
            type: ActionType.ToggleActiveCoinCode,
            payload: 'BTC',
        };

        const newState = Reducer(initialState, action);
        expect(newState.activeCoinCodes).not.toContain('BTC');

        const action2: Action = {
            type: ActionType.ToggleActiveCoinCode,
            payload: 'BTC',
        };
        const newState2 = Reducer(newState, action2);
        expect(newState2.activeCoinCodes).toContain('BTC');
    });

    it('should toggle currency dollar correctly', () => {
        const action: Action = {
            type: ActionType.ToggleCurrencyDollar,
        };

        const newState = Reducer(initialState, action);
        expect(newState.isCurrencyDollar).toEqual(false);

        const action2: Action = {
            type: ActionType.ToggleCurrencyDollar,
        };
        const newState2 = Reducer(newState, action2);
        expect(newState2.isCurrencyDollar).toEqual(true);
    });

    it('should toggle is favourites view correctly', () => {
        const action: Action = {
            type: ActionType.ToggleIsFavourites,
        };

        const newState = Reducer(initialState, action);
        expect(newState.isFavouritesView).toEqual(false);

        const action2: Action = {
            type: ActionType.ToggleIsFavourites,
        };
        const newState2 = Reducer(newState, action2);
        expect(newState2.isFavouritesView).toEqual(true);
    });
});
