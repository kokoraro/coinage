import React from 'react';

const AddCoinListItem = ({ data, handleAddCoinClick }) => {
  const coinStyle = data.showing ? { 
    border: '3px solid lightgreen', 
    color: 'lightgreen',
    background: 'white'
  } : null;
  
  return (
    <div onClick={ handleAddCoinClick } style={ coinStyle }>{data.name}</div>
  )
}

export default AddCoinListItem;