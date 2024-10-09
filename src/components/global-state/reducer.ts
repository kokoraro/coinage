import { Action, ActionType, State } from './types';

export const Reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionType.ToggleActiveCoinCode: {
            if (state.activeCoinCodes.includes(action.payload)) {
                return {
                    ...state,
                    activeCoinCodes: state.activeCoinCodes.filter((code) => action.payload !== code),
                };
            }
            return {
                ...state,
                activeCoinCodes: [...state.activeCoinCodes, action.payload],
            };
        }

        case ActionType.ToggleCurrencyDollar:
            return {
                ...state,
                isCurrencyDollar: !state.isCurrencyDollar,
            };

        case ActionType.ToggleIsFavourites:
            return {
                ...state,
                isFavouritesView: !state.isFavouritesView,
            };

        default:
            return state;
    }
};
