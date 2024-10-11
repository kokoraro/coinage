import { describe, vi } from 'vitest';
import * as fetcher from '../../utils/fetcher';
import { fetchCoinData, fetchCoinPrice } from './coins';

const dummyApiUrl = 'foo-endpoint';

vi.mock('../../utils/config', () => ({
    default: {
        apiUrl: 'foo',
    },
}));

describe('coin api queries', () => {
    describe('fetchCoinData', () => {
        it('should call fetcher with the correct arguments', () => {
            const fetcherSpy = vi.spyOn(fetcher, 'default').mockResolvedValueOnce({});
            void fetchCoinData();
            expect(fetcherSpy).toHaveBeenCalledWith('get', dummyApiUrl, 'data/all/coinlist');
        });
    });

    describe('fetchCoinPrice', () => {
        it('should call fetcher with the correct arguments', () => {
            const fetcherSpy = vi.spyOn(fetcher, 'default').mockResolvedValueOnce({});
            void fetchCoinPrice(['BTC', 'ETH']);
            expect(fetcherSpy).toHaveBeenCalledWith('get', dummyApiUrl, 'data/pricemulti?fsyms=BTC,ETH&tsyms=USD,GBP');
        });
    });
});
