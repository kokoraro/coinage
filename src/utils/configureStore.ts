import createSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware, compose, Store } from "redux";
import { createRootReducer, rootSaga, ApplicationState } from "../redux";

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const createReduxStore = (): Store<ApplicationState> => {
    const store = createStore(
        createRootReducer(),
        {},
        composeEnhancer(applyMiddleware(sagaMiddleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store;
}

