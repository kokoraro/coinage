export interface NewsArticle {
    id: string;
    publishedOn: string;
    imageUrl: string;
    title: string;
    url: string;
    body: string;
    tags: string;
}

export enum NewsActionTypes {
    GET_NEWS = '@news/GET_NEWS_REQUEST',
    GET_NEWS_SUCCESS = '@news/GET_NEWS_SUCCESS_REQUEST',
    GET_NEWS_ERROR = '@news/GET_NEWS_ERROR_REQUEST',
}

// readonly modifier to get compile time immutability.
export interface NewState {
    readonly data: NewsArticle[];
    readonly loading: boolean;
    readonly errors: string;
}