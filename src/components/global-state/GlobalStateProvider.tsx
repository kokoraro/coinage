import React, { createContext, useReducer } from 'react';
import { DEFAULT_FAVOURITE_COINS } from '../../utils/config';
import { Reducer } from './reducer';
import { ContextProps, GlobalStateProviderProps, State } from './types';

export const StoreContext = createContext({} as ContextProps);

const initialState: State = {
    activeCoinCodes: DEFAULT_FAVOURITE_COINS,
    isFavouritesView: true,
    isCurrencyDollar: true,
};

const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export default GlobalStateProvider;
