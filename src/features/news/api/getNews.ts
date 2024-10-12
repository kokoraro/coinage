import config from '../../../utils/config';
import fetcher from '../../../utils/fetcher';

export const getNews = () => fetcher('get', config.apiUrl, 'data/v2/news/?lang=EN');
