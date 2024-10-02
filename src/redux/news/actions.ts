import { action } from 'typesafe-actions';
import { NewsActionTypes, NewsArticle } from './types'

export const getNews = () => action(NewsActionTypes.GET_NEWS);
export const getNewsSuccess = (data: NewsArticle[]) => action(NewsActionTypes.GET_NEWS_SUCCESS, data);
export const getNewsError = (message: string) => action(NewsActionTypes.GET_NEWS_ERROR, message);