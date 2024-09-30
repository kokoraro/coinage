import { all, call, fork, put, takeEvery } from 'redux-saga/effects'
import { NewsActionTypes } from './types'
import { getNewsError, getNewsSuccess } from './actions'
import fetcher from '../../utils/fetcher'
import config from '../../utils/config'

function* handleGetNews() {
    try {
        const response = yield call(fetcher, 'get', config.apiUrl, 'data/v2/news/?lang=EN');

        if (response.error) {
            yield put(getNewsError(response.error));
        } else {
            yield put(getNewsSuccess(response.Data));
        }
    } catch (err) {
        if (err instanceof Error) {
            yield put(getNewsError(err.stack!));
        } else {
            yield put(getNewsError('An unknown error occured.'));
        }
    }
}

function* watchGetNewsData() {
    yield takeEvery(NewsActionTypes.GET_NEWS, handleGetNews)
}

export function* newsSaga() {
    yield all([
        fork(watchGetNewsData),
    ]);
}