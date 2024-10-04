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

export enum ActionType {
    ToggleActiveCoinCode,
    ToggleCurrencyDollar,
    ToggleIsFavourites
}

type Action = 
    { type: ActionType.ToggleActiveCoinCode, payload: string } | 
    { type: ActionType.ToggleCurrencyDollar } | 
    { type: ActionType.ToggleIsFavourites};

const Reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case ActionType.ToggleActiveCoinCode: {
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

        case ActionType.ToggleCurrencyDollar:
            return {
                ...state,
                isCurrencyDollar: !state.isCurrencyDollar,
            }

        case ActionType.ToggleIsFavourites:
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
