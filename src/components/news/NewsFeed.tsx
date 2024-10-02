import React from 'react';
import LoadingPanel from '../ui/LoadingPanel';
import NewsItem from './NewsItem';
import { useQuery } from 'react-query';
import fetcher from '../../utils/fetcher';
import config from '../../utils/config';

export interface NewsArticle {
    id: string;
    publishedOn: string;
    imageUrl: string;
    title: string;
    url: string;
    body: string;
    tags: string;
}

interface NewsResult {
    Data: NewsArticle[];
}

const fetchNews = () => fetcher('get', config.apiUrl, 'data/v2/news/?lang=EN');

const NewsFeed = (): JSX.Element => {
    const { isLoading, data } = useQuery<NewsResult, Error>('news', fetchNews);

    if (isLoading) return <LoadingPanel />

    return (
        <div className="news-feed">
            <h3 className="news-feed-title">news feed</h3>
            {data?.Data.map(article => <NewsItem key={article.id} article={article} />)}
        </div>
        
    );
};

export default NewsFeed;
