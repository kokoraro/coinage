import axios from 'axios';
import {
    GET_COIN_DATA,
    GET_COIN_DATA_ERROR,
    GET_COIN_PRICE,
    ADD_COINS,
    REMOVE_COIN,
} from './types';
import { Dispatch } from 'redux';

// Action definition

export interface GetCoinDataAction {
    type: typeof GET_COIN_DATA;
}

export interface GetCoinPriceAction {
    type: typeof GET_COIN_PRICE;
    codes: string[];
}

export interface AddCoinsAction {
    type: typeof ADD_COINS;
    ids: string[];
}

export interface RemoveCoinAction {
    type: typeof REMOVE_COIN;
    id: string;
}

const FAVOURITES = [
    'BTC', 'XRP', 'LTC', 'ETH', 'XMR',
    'ZEC', 'DSH', 'GNT', 'ADA', 'XVG',
];

export const getCoinData = () => async (dispatch: Dispatch) => {
    try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
        const { Data: coinData } = response.data;
        const coinList = Object.keys(coinData).map((coin, idx) => ({
            id: idx,
            name: coinData[coin].CoinName,
            imageURL: coinData[coin].ImageUrl,
            code: coin,
            showing: FAVOURITES.includes(coin),
            price: { GBP: 0, USD: 0 },
        }));
        dispatch({ type: GET_COIN_DATA, payload: coinList });
    } catch (e) {
        dispatch({ type: GET_COIN_DATA_ERROR, payload: 'Error Fetching Data' });
    }
};

export const getCoinPrice = (codes: string[]) => async (dispatch: Dispatch) => {
    try {
        const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${codes.join(',')}&tsyms=USD,GBP`;
        const response = await axios.get(url);
        const { data: coinData } = response;
        dispatch({ type: GET_COIN_PRICE, payload: coinData });
    } catch (e) {
        dispatch({ type: GET_COIN_DATA_ERROR, payload: 'Error Fetching Data' });
    }
};

export const addCoins = (ids: string[]) => (dispatch: Dispatch) => {
    dispatch({ type: ADD_COINS, payload: ids });
};

export const removeCoin = (id: string) => (dispatch: Dispatch) => {
    dispatch({ type: REMOVE_COIN, payload: id });
};
