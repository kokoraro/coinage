import { vi } from 'vitest';
import fetcher from '../../utils/fetcher';
import { fetchCoinData, fetchCoinPrice } from './coins';

const dummyApiUrl = 'foo';

vi.mock('../../utils/fetcher');
vi.mock('../../utils/config', () => ({
    default: {
        apiUrl: 'foo',
    },
}));

describe('fetchCoinData', () => {
    it('should call fetcher with the correct arguments', () => {
        void fetchCoinData();
        expect(fetcher).toHaveBeenCalledWith('get', dummyApiUrl, 'data/all/coinlist');
    });
});

describe('fetchCoinPrice', () => {
    it('should call fetcher with the correct arguments', () => {
        void fetchCoinPrice(['BTC', 'ETH']);
        expect(fetcher).toHaveBeenCalledWith('get', dummyApiUrl, 'data/pricemulti?fsyms=BTC,ETH&tsyms=USD,GBP');
    });
});
