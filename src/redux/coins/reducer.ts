import { Reducer } from 'redux'
import { CoinState, CoinsActionTypes } from './types'

const INITIAL_STATE: CoinState = {
    data: [],
    errors: '',
    loading: true,
    loadingPrice: true,
}

const FAVOURITES = [
    'BTC', 'XRP', 'LTC', 'ETH', 'XMR',
    'ZEC', 'DSH', 'GNT', 'ADA', 'XVG',
]; // TODO: move to config (default favs)

const reducer: Reducer<CoinState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CoinsActionTypes.GET_COIN_DATA:
            return { ...state, loading: true };

        case CoinsActionTypes.GET_COIN_DATA_SUCCESS: {
            const coins = action.payload;

            const data = Object.keys(coins).map((coin, idx) => ({
                id: idx,
                name: coins[coin].CoinName,
                imageURL: coins[coin].ImageUrl,
                code: coin,
                showing: FAVOURITES.includes(coin),
                price: { GBP: '0', USD: '0' },
            }));

            return { ...state, loading: false, data };
        }

        case CoinsActionTypes.GET_COIN_DATA_ERROR:
            return { ...state, loading: false, errors: action.payload };

        case CoinsActionTypes.GET_COIN_PRICE:
            return { ...state, loadingPrice: true };

        case CoinsActionTypes.GET_COIN_PRICE_SUCCESS:
            return Object.assign({}, state, {
                loadingPrice: false,
                data: state.data.map(coin => (
                    coin.showing ? { ...coin, price: action.payload[coin.code] } : coin
                )),
            });

        case CoinsActionTypes.GET_COIN_PRICE_ERROR:
            return { ...state, loadingPrice: false, errors: action.payload };

        case CoinsActionTypes.TOGGLE_COIN_SHOWING:
            return Object.assign({}, state, {
                data: state.data.map(coin => (
                    coin.id === action.payload ? { ...coin, showing: !coin.showing } : coin
                )),
            });

        default:
            return state;
    }
}

export { reducer as coinsReducer };