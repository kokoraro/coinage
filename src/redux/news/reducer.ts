import { Reducer } from 'redux'
import { NewState, NewsActionTypes } from './types'

const INITIAL_STATE: NewState = {
    data: [],
    errors: '',
    loading: true,
}

const reducer: Reducer<NewState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NewsActionTypes.GET_NEWS:
            return { ...state, loading: true };

        case NewsActionTypes.GET_NEWS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case NewsActionTypes.GET_NEWS_ERROR:
            return { ...state, loading: false, errors: action.payload };

        default:
            return state;
    }
}

export { reducer as newsReducer };