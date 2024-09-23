export interface Coin {
    id: number;
    price: {
        GBP: string,
        USD: string,
    };
    showing: boolean;
    code: string;
    name: string;
    imageURL: string;
}

export enum CoinsActionTypes {
    GET_COIN_DATA = '@coins/GET_COIN_DATA_REQUEST',
    GET_COIN_DATA_SUCCESS = '@coins/GET_COIN_DATA_SUCCESS',
    GET_COIN_DATA_ERROR = '@coins/GET_COIN_DATA_ERROR',
    GET_COIN_PRICE = '@coins/GET_COIN_PRICE_REQUEST',
    GET_COIN_PRICE_SUCCESS = '@coins/GET_COIN_PRICE_SUCCESS',
    GET_COIN_PRICE_ERROR = '@coins/GET_COIN_PRICE_ERROR',
    ADD_COINS = '@coins/ADD_COINS',
    REMOVE_COIN = '@coins/REMOVE_COIN',
}

// readonly modifier to get compile time immutability.
export interface CoinState {
    readonly loading: boolean
    readonly data: Coin[]
    readonly errors: string
}

