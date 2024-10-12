import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { render as rtlRender } from '@testing-library/react';

const queryClient = new QueryClient();

/** Testing wrapper to add providers to existing testing library render function */
export function render(children: ReactNode) {
    return rtlRender(<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>);
}
