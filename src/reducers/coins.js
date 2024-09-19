import { GET_COIN_DATA, GET_COIN_DATA_ERROR } from '../actions/types';

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
        default:
            return state;
    }
}
