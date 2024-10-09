import React, { memo } from 'react';
import LoadingPanel from '../ui/LoadingPanel';
import NewsItem from './NewsItem';
import { useQuery } from 'react-query';
import { fetchNews, NewsResult } from '../api/newsFeed';

const NewsFeed = (): JSX.Element => {
    const { isLoading, data } = useQuery<NewsResult, Error>('news', fetchNews);

    if (isLoading) return <LoadingPanel />;

    return (
        <div className="news-feed">
            <h3 className="news-feed-title">news feed</h3>
            {data?.Data.map((article) => (
                <NewsItem key={article.id} article={article} />
            ))}
        </div>
    );
};

export default memo(NewsFeed);
