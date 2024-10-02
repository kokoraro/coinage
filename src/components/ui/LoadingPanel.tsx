import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface LoadingPanelProps {
    text?: string;
}

const LoadingPanel = ({ text = 'Loading data, please wait.' }: LoadingPanelProps): JSX.Element => (
    <div className="loading-panel">
        <LoadingSpinner />
        <p>{text}</p>
    </div>
);

export default LoadingPanel;