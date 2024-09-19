import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import BitcoinTracker from './components/BitcoinTracker';
import './main.sass';

import reducers from './reducers';

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
    reducers,
    {},
    composeEnhancer(applyMiddleware(reduxThunk)),
);

render(
    <Provider store={store}>
        <BitcoinTracker />
    </Provider>,
    document.getElementById('root'),
);
