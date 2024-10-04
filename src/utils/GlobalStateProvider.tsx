import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { DEFAULT_FAVOURITE_COINS } from "./config";

interface State {
    activeCoinCodes: string[];
    isFavouritesView: boolean;
    isCurrencyDollar: boolean;
}

interface GlobalStateProviderProps {
    children: ReactNode;
}

type Action = { type: 'TOGGLE_ACTIVE_COIN_CODE', payload: string } | { type: 'TOGGLE_CURRENCY_DOLLAR' } | { type: 'TOGGLE_IS_FAVOURITES'};

const Reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'TOGGLE_ACTIVE_COIN_CODE': {
            if (state.activeCoinCodes.includes(action.payload)) {
                return {
                    ...state,
                    activeCoinCodes: state.activeCoinCodes.filter(code => action.payload !== code),
                };
            }
            return {
                ...state,
                activeCoinCodes: [...state.activeCoinCodes, action.payload]
            }
        }

        case 'TOGGLE_CURRENCY_DOLLAR':
            return {
                ...state,
                isCurrencyDollar: !state.isCurrencyDollar,
            }

        case 'TOGGLE_IS_FAVOURITES':
            return {
                ...state,
                isFavouritesView: !state.isFavouritesView,
            }

        default:
            return state;
    }
}

const initialState: State = {
    activeCoinCodes: DEFAULT_FAVOURITE_COINS,
    isFavouritesView: true,
    isCurrencyDollar: true,
};

interface ContextProps {
    state: State;
    dispatch: ({ type }: Action) => void;
}

const StoreContext = createContext({} as ContextProps);

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return (
        <StoreContext.Provider value={{state, dispatch}}>
            {children}
        </StoreContext.Provider>
    );
}

export const useGlobalStateContext = () => {
    const {state, dispatch} = useContext(StoreContext);
    return {state, dispatch};
}

export const useSelector = (stateKey: keyof State) => {
    const { state } = useContext(StoreContext);
    return state[stateKey];
};

export const useDispatch = () => {
    const { dispatch } = useContext(StoreContext);
    return dispatch;
};

export default GlobalStateProvider;
