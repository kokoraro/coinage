import { createRoot } from 'react-dom/client';
import App from '@/App';
import '@/styles/index.sass';
import { iconLibrarySetup } from '@/config/icon';

iconLibrarySetup();

const container = document.getElementById('root');
const root = createRoot(container as HTMLElement);

root.render(<App />);
