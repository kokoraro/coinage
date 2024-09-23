import {
    GET_COIN_DATA,
    GET_COIN_DATA_ERROR,
    GET_COIN_PRICE,
    ADD_COINS,
    REMOVE_COIN,
} from '../actions/types';

export interface Coin {
    id: number;
    price: { [key: string]: string };
    showing: boolean;
    code: string;
    name: string;
}

export interface CoinState {
    coins: Coin[];
    errorMessage: string;
}

interface Action {
    type: string;
    payload: any;
}

const INITIAL_STATE: CoinState = {
    coins: [],
    errorMessage: '',
};

export default function (state = INITIAL_STATE, action: Action) {
    switch (action.type) {
        case GET_COIN_DATA:
            return { ...state, coins: action.payload };

        case GET_COIN_DATA_ERROR:
            return { ...state, errorMessage: action.payload };

        case GET_COIN_PRICE:
            return Object.assign({}, state, {
                coins: state.coins.map(coin => (
                    coin.showing ? { ...coin, price: action.payload[coin.code] } : coin
                )),
            });

        case ADD_COINS:
            return Object.assign({}, state, {
                coins: state.coins.map(coin => (
                    action.payload.includes(coin.id) ? { ...coin, showing: true } : coin
                )),
            });

        case REMOVE_COIN:
            return Object.assign({}, state, {
                coins: state.coins.map(coin => (
                    coin.id === action.payload ? { ...coin, showing: false } : coin
                )),
            });

        default:
            return state;
    }
}
