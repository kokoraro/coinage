import { vi } from 'vitest';
import * as fetcher from '../../utils/fetcher';
import { fetchNews } from './newsFeed';

const dummyApiUrl = 'foo-endpoint';

vi.mock('../../utils/config', () => ({
    default: {
        apiUrl: 'foo',
    },
}));

describe('fetchNews', () => {
    it('should call fetcher with the correct arguments', () => {
        const fetcherSpy = vi.spyOn(fetcher, 'default').mockResolvedValueOnce({});
        void fetchNews();
        expect(fetcherSpy).toHaveBeenCalledWith('get', dummyApiUrl, 'data/v2/news/?lang=EN');
    });
});
