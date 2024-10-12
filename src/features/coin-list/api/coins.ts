import config from '@/config';
import fetcher from '@/utils/fetcher';
import { CoinDataResponse, CoinPriceResponse } from '../types';

export function fetchCoinData() {
    return fetcher<CoinDataResponse>('get', config.apiUrl, 'data/all/coinlist');
}

export function fetchCoinPrice(coinCodes: string[]) {
    return fetcher<CoinPriceResponse>('get', config.apiUrl, `data/pricemulti?fsyms=${coinCodes.join(',')}&tsyms=USD,GBP`);
}
