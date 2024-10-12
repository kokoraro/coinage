import { memo } from 'react';
import LoadingPanel from '../../../components/ui/LoadingPanel';
import NewsItem from './NewsItem';
import { useQuery } from 'react-query';
import { NewsResult } from '../types/NewsResult';
import { getNews } from '../api/getNews';

const NewsFeed = (): JSX.Element => {
    const { isLoading, data } = useQuery<NewsResult, Error>('news', getNews);

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
