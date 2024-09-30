import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../../redux/news/actions';
import { ApplicationState } from '../../redux';
import LoadingPanel from '../ui/LoadingPanel';
import NewsItem from './NewsItem';

interface NewsFeedProps {

}

const NewsFeed = ({ ...props }: NewsFeedProps): JSX.Element => {
    const { data, loading, errors } = useSelector((state: ApplicationState) => state.news);
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getNews();
        dispatch(action);
    }, [dispatch]);

    console.log('data', data);

    if (loading) return <LoadingPanel />

    return (
        <div className="news-feed">
            {data.map(() => <NewsItem />)}
        </div>
        
    );
};

export default NewsFeed;
