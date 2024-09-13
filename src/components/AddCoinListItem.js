import React from 'react';

const AddCoinListItem = ({ data, handleAddCoinClick }) => {
  const coinStyle = data.showing ? { border: '3px solid lightgreen', color: 'lightgreen' } : null
  return <div onClick={ handleAddCoinClick } style={ coinStyle } >{data.name}</div>
}

export default AddCoinListItem;