import { action } from 'typesafe-actions';
import { CoinsActionTypes, Coin } from './types'

export const getCoinData = () => action(CoinsActionTypes.GET_COIN_DATA);
export const getCoinDataSuccess = (data: Coin[]) => action(CoinsActionTypes.GET_COIN_DATA_SUCCESS, data);
export const getCoinDataError = (message: string) => action(CoinsActionTypes.GET_COIN_DATA_ERROR, message);

export const getCoinPrice = (codes: string[]) => action(CoinsActionTypes.GET_COIN_PRICE, codes);
export const getCoinPriceSuccess = (data: Coin[]) => action(CoinsActionTypes.GET_COIN_PRICE_SUCCESS, data);
export const getCoinPriceError = (message: string) => action(CoinsActionTypes.GET_COIN_PRICE_ERROR, message);

export const addCoins = (ids: string[]) => action(CoinsActionTypes.ADD_COINS, ids);
export const removeCoins = (id: string) => action(CoinsActionTypes.REMOVE_COIN, id);
