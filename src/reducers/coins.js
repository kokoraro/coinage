import { GET_COIN_DATA, GET_COIN_DATA_ERROR, GET_COIN_PRICE } from '../actions/types';

const INITIAL_STATE = {
    coins: [],
    errorMessage: false,
};

export default function (state = INITIAL_STATE, action) {
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
        default:
            return state;
    }
}
