import { createRoot } from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { iconLibrarySetup } from './utils/iconConfig';
import GlobalStateProvider from './components/global-state/GlobalStateProvider';
import App from './components/App';
import './styles/main.sass';

const queryClient = new QueryClient();
iconLibrarySetup();

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <QueryClientProvider client={queryClient}>
        <GlobalStateProvider>
            <App />
        </GlobalStateProvider>
    </QueryClientProvider>,
);
