import { Provider } from 'jotai';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { iconLibrarySetup } from '@/config/icon';
import App from '@/components/App';
import { mainStore } from '@/store';
import '@/styles/index.sass';

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
