import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';

import { createReduxStore } from './utils/configureStore';
import { iconLibrarySetup } from './utils/iconConfig';
import App from './components/App';
import './styles/main.sass';

const store = createReduxStore();
iconLibrarySetup();

const queryClient = new QueryClient()

ReactDOM.render(
    <Provider store={store}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </Provider>,
    document.getElementById('root'),
);
