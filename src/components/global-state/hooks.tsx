import { useContext } from 'react';
import { StoreContext } from './GlobalStateProvider';
import { State } from './types';

export const useGlobalStateContext = () => {
    const { state, dispatch } = useContext(StoreContext);
    return { state, dispatch };
};

export const useSelector = (stateKey: keyof State) => {
    const { state } = useContext(StoreContext);
    return state[stateKey];
};

export const useDispatch = () => {
    const { dispatch } = useContext(StoreContext);
    return dispatch;
};
