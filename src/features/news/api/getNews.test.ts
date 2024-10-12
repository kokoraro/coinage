import { vi } from 'vitest';
import * as fetcher from '@/utils/fetcher';
import { getNews } from './getNews';

const dummyApiUrl = 'foo-endpoint';

vi.mock('@/config', () => ({
    default: {
        apiUrl: 'foo',
    },
}));

describe('getNews', () => {
    it('should call fetcher with the correct arguments', () => {
        const fetcherSpy = vi.spyOn(fetcher, 'default').mockResolvedValueOnce({});
        void getNews();
        expect(fetcherSpy).toHaveBeenCalledWith('get', dummyApiUrl, 'data/v2/news/?lang=EN');
    });
});
