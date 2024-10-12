import { useQuery } from 'react-query';
import LoadingPanel from '@/components/ui/LoadingPanel';
import NewsItem from '../components/NewsItem';
import { NewsResult } from '../types';
import { getNews } from '../api/getNews';
import queryKeys from '@/config/query-keys';

export const NewsFeed = (): JSX.Element => {
    const { isLoading, data } = useQuery<NewsResult, Error>(queryKeys.news, getNews);

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
