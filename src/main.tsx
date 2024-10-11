import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { iconLibrarySetup } from './utils/iconConfig';
import App from './components/App';
import './styles/index.sass';
import { Provider } from 'jotai';
import { mainStore } from './store';

const queryClient = new QueryClient();
iconLibrarySetup();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(
    <QueryClientProvider client={queryClient}>
        <Provider store={mainStore}>
            <App />
        </Provider>
    </QueryClientProvider>,
);
