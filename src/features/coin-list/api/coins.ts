import config from '../../../utils/config';
import fetcher from '../../../utils/fetcher';

export function fetchCoinData() {
    return fetcher('get', config.apiUrl, 'data/all/coinlist');
}

export function fetchCoinPrice(coinCodes: string[]) {
    return fetcher('get', config.apiUrl, `data/pricemulti?fsyms=${coinCodes.join(',')}&tsyms=USD,GBP`);
}
