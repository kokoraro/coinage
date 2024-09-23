import React from 'react';

const AddCoinListItem = ({ data, handleAddCoinClick }) => {
    const coinStyle = data.showing ? {
        border: '3px solid lightgreen',
        color: 'lightgreen',
        background: 'white',
    } : null;

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
