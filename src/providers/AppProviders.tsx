import { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { QueryClientProvider, QueryClient } from 'react-query';
import { mainStore } from '@/store';

const queryClient = new QueryClient();

const AppProviders = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <JotaiProvider store={mainStore}>{children}</JotaiProvider>
    </QueryClientProvider>
);

export default AppProviders;
