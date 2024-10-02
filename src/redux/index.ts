import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { coinsReducer } from './coins/reducer';
import { coinsSaga } from './coins/sagas';
import { CoinState } from './coins/types';

export interface ApplicationState {
    coins: CoinState;
}

export const createRootReducer = () => combineReducers({
    coins: coinsReducer,
});

// forks execute in the background
export function* rootSaga() {
    yield all([
        fork(coinsSaga),
    ]);
}