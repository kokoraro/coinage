import { combineReducers } from 'redux';
import coins, { CoinState } from './coins';

export interface AppState {
    coins: CoinState;
}

export default combineReducers({
    coins,
});
