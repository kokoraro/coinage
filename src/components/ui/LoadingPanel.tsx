interface LoadingPanelProps {
    text?: string;
}

const LoadingPanel = ({ text = 'Loading data, please wait.' }: LoadingPanelProps): JSX.Element => (
    <div className="loading-panel">
        <div className="loading-spinner" role="progressbar" aria-label="loading spinner"></div>
        <p>{text}</p>
    </div>
);

export default LoadingPanel;
