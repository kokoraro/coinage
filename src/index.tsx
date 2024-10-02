import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { createReduxStore } from './utils/configureStore';
import App from './components/App';
import './styles/main.sass';

const store = createReduxStore();
iconLibrarySetup();

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);
