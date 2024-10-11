import { render, screen } from '@testing-library/react';
import LoadingPanel from './LoadingPanel';

describe('LoadingPanel', () => {
    it('should render a loading spinner and a loading message', () => {
        render(<LoadingPanel />);
        expect(screen.getByRole('progressbar', { name: 'loading spinner' })).toBeInTheDocument();
        expect(screen.getByText('Loading data, please wait.')).toBeInTheDocument();
    });

    it('should render a custom loading message if provided', () => {
        render(<LoadingPanel text="Fetching coin prices..." />);
        expect(screen.getByText('Fetching coin prices...')).toBeInTheDocument();
    });
});
