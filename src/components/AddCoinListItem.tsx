import React from 'react';

interface Data {
    showing: boolean;
    name: string;
}

interface AddCoinListItemProps {
    data: Data;
    handleAddCoinClick: () => void;
}     

const AddCoinListItem = ({ data, handleAddCoinClick }: AddCoinListItemProps) => {
    const coinStyle = data.showing ? {
        border: '3px solid lightgreen',
        color: 'lightgreen',
        background: 'white',
    } : undefined;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleAddCoinClick}
            style={coinStyle}
        >
            {data.name}
        </div>
    );
};

export default AddCoinListItem;
