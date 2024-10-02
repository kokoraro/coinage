import React from 'react';
import { NewsArticle } from '../../redux/news/types';

interface NewsItemProps {
    article: NewsArticle;
}

const NewsItem = ({ article }: NewsItemProps): JSX.Element => (
    <div className="news-item">
        <div className="news-article">
            <h3 className="new-title">{article.title}</h3>
            <p>{article.body}</p>
            <a href={article.url}>read more.</a>
        </div>
    </div>
);

export default NewsItem;
