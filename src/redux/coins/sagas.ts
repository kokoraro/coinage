import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { CoinsActionTypes } from './types'
import { getCoinDataError, getCoinDataSuccess, getCoinPriceError, getCoinPriceSuccess } from './actions'
import fetcher from '../../utils/fetcher'
import { AnyAction } from 'redux'
import config from '../../utils/config'

function* handleGetCoinData() {
    try {
        const response = yield call(fetcher, 'get', config.apiUrl, 'data/all/coinlist');

        if (response.error) {
            yield put(getCoinDataError(response.error));
        } else {
            yield put(getCoinDataSuccess(response.Data));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(getCoinDataError(err.stack!));
        } else {
            yield put(getCoinDataError('An unknown error occured.'));
        }
    }
}

function* handleGetCoinPrice({ payload }: AnyAction) {
    try {
        const path = `data/pricemulti?fsyms=${payload.join(',')}&tsyms=USD,GBP`;
        const response = yield call(fetcher, 'get', config.apiUrl, path);

        if (response.error) {
            yield put(getCoinPriceError(response.error));
        } else {
            yield put(getCoinPriceSuccess(response));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(getCoinPriceError(err.stack!));
        } else {
            yield put(getCoinPriceError('An unknown error occured.'));
        }
    }
}

// Take every watches redux actions and triggers sagas
function* watchGetCoinData() {
    yield takeEvery(CoinsActionTypes.GET_COIN_DATA, handleGetCoinData)
}

function* watchGetCoinPrice() {
    yield takeEvery(CoinsActionTypes.GET_COIN_PRICE, handleGetCoinPrice)
}

export function* coinsSaga() {
    yield all([
        fork(watchGetCoinData),
        fork(watchGetCoinPrice)
    ]);
}