import React from 'react';
import { Coin } from '../../redux/coins/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { toggleCoinShowing } from '../../redux/coins/actions';

interface CoinListItemProps {
    coin: Coin;
    currDollar: boolean;
    isFavouritesView: boolean;
}

const formatCoinPrice = (coin: Coin, currDollar: boolean) => {
    const currency = currDollar ? 'USD' : 'GBP';
    const currSymbol = currDollar ? '$' : '£';
    const price = Number(coin.price[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return `${currSymbol}${value}`;
}

const CoinListItem = ({
    coin,
    currDollar,
    isFavouritesView,
}: CoinListItemProps) => {
    const dispatch = useDispatch();

    const handleFavouriteClick = () => {
        const action = toggleCoinShowing(coin.id);
        dispatch(action);
    }

    return (
        <div className="coin">
            <img src={coin.imageURL && `https://www.cryptocompare.com${coin.imageURL}`} alt={coin.name} />
            <div className="coin-code">{coin.code}</div>
            <div className="coin-name">{coin.name}</div>
            {!isFavouritesView ? (
                <FontAwesomeIcon icon={[coin.showing ? 'fas' : 'far', 'star']} onClick={handleFavouriteClick} />
            ) : (
                <div className="coin-price">{formatCoinPrice(coin, currDollar)}</div>
            )}
        </div>
    );
};

export default CoinListItem;
