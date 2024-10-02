import config from "../../utils/config";
import fetcher from "../../utils/fetcher";

export interface NewsArticle {
    id: string;
    publishedOn: string;
    imageUrl: string;
    title: string;
    url: string;
    body: string;
    tags: string;
}

export interface NewsResult {
    Data: NewsArticle[];
}

export const fetchNews = () => fetcher('get', config.apiUrl, 'data/v2/news/?lang=EN');