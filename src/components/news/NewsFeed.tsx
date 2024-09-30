import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getNews } from '../../redux/news/actions';
import { ApplicationState } from '../../redux';
import LoadingPanel from '../ui/LoadingPanel';
import NewsItem from './NewsItem';

const NewsFeed = (): JSX.Element => {
    const { data, loading } = useSelector((state: ApplicationState) => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getNews();
        dispatch(action);
    }, [dispatch]);

    if (loading) return <LoadingPanel />

    return (
        <div className="news-feed">
            <h3 className="news-feed-title">news feed</h3>
            {data.map(article => <NewsItem key={article.id} article={article} />)}
        </div>
        
    );
};

export default NewsFeed;
