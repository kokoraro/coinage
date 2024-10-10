import config from '../../utils/config';
import fetcher from '../../utils/fetcher';

export interface CoinPrice {
    GBP: string;
    USD: string;
}

export interface Coin {
    id: string;
    code: string;
    name: string;
    imageURL: string;
}

export type CoinPriceResponse = { [key: string]: CoinPrice };

export function fetchCoinData() {
    return fetcher('get', config.apiUrl, 'data/all/coinlist');
}

export function fetchCoinPrice(coinCodes: string[]) {
    return fetcher('get', config.apiUrl, `data/pricemulti?fsyms=${coinCodes.join(',')}&tsyms=USD,GBP`);
}
