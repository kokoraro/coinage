import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { coinsReducer } from './coins/reducer';
import { coinsSaga } from './coins/sagas';
import { CoinState } from './coins/types';

import { newsReducer } from './news/reducer';
import { newsSaga } from './news/sagas';
import { NewState } from './news/types';

export interface ApplicationState {
    coins: CoinState;
    news: NewState;
}

export const createRootReducer = () => combineReducers({
    coins: coinsReducer,
    news: newsReducer,
});

// forks execute in the background
export function* rootSaga() {
    yield all([
        fork(coinsSaga),
        fork(newsSaga),
    ]);
}