import React from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { iconLibrarySetup } from './utils/iconConfig';
import GlobalStateProvider from './components/global-state/GlobalStateProvider';
import App from './components/App';
import './styles/index.sass';

const queryClient = new QueryClient();
iconLibrarySetup();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
            <App />
        </GlobalStateProvider>
    </QueryClientProvider>,
);
