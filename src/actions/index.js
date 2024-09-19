import axios from 'axios';
import { GET_COIN_DATA, GET_COIN_DATA_ERROR } from './types';

const FAVOURITES = [
    'BTC', 'XRP', 'LTC', 'ETH', 'XMR',
    'ZEC', 'DSH', 'GNT', 'ADA', 'XVG',
];

export const getCoinData = () => async (dispatch) => {
    try {
        const response = await axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
        const { Data: coinData } = response.data;
        const coinList = Object.keys(coinData).map((coin, idx) => (
            {
                id: idx,
                name: coinData[coin].CoinName,
                imageURL: coinData[coin].ImageUrl,
                code: coin,
                showing: FAVOURITES.includes(coin),
            }
        ));
        dispatch({ type: GET_COIN_DATA, payload: coinList });
    } catch (e) {
        dispatch({ type: GET_COIN_DATA_ERROR, payload: 'Error Fetching Data' });
    }
}
