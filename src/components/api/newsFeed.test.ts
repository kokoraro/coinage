import { vi } from 'vitest';
import fetcher from '../../utils/fetcher';
import { fetchNews } from './newsFeed';

const dummyApiUrl = 'foo';

vi.mock('../../utils/fetcher');
vi.mock('../../utils/config', () => ({
    default: {
        apiUrl: 'foo',
    },
}));

describe('fetchNews', () => {
    it('should call fetcher with the correct arguments', () => {
        fetchNews();
        expect(fetcher).toHaveBeenCalledWith('get', dummyApiUrl, 'data/v2/news/?lang=EN');
    });
});
