import { ReactNode } from 'react';

export interface State {
    activeCoinCodes: string[];
    isFavouritesView: boolean;
    isCurrencyDollar: boolean;
}

export interface GlobalStateProviderProps {
    children: ReactNode;
}

export interface ContextProps {
    state: State;
    dispatch: ({ type }: Action) => void;
}

export enum ActionType {
    ToggleActiveCoinCode,
    ToggleCurrencyDollar,
    ToggleIsFavourites,
}

export type Action =
    | { type: ActionType.ToggleActiveCoinCode; payload: string }
    | { type: ActionType.ToggleCurrencyDollar }
    | { type: ActionType.ToggleIsFavourites };
