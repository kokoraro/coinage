import config from '@/config';
import fetcher from '@/utils/fetcher';
import { NewsResult } from '../types';

export const getNews = () => fetcher<NewsResult>('get', config.apiUrl, 'data/v2/news/?lang=EN');
