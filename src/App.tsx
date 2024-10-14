import AppProviders from '@/providers/AppProviders';
import IndexPage from '@/routes';

const App = () => (
    <AppProviders>
        <IndexPage />
    </AppProviders>
);

export default App;
