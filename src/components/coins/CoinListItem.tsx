import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Coin, CoinPrice } from '../api/coins';
import { useDispatch } from '../../utils/GlobalStateProvider';

interface CoinListItemProps {
    coin: Coin;
    isCurrencyDollar: boolean;
    isFavouritesView: boolean;
}

// TODO: put into utils
const formatCoinPrice = (coinPrice: CoinPrice, isCurrencyDollar: boolean) => {
    const currency = isCurrencyDollar ? 'USD' : 'GBP';
    const currSymbol = isCurrencyDollar ? '$' : '£';
    const price = Number(coinPrice[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return `${currSymbol}${value}`;
}

// TODO: Make two different components for coins
const CoinListItem = ({
    coin,
    isCurrencyDollar,
    isFavouritesView,
}: CoinListItemProps) => {
    const dispatch = useDispatch();
    const coinCode = coin.code;

    const handleFavouriteClick = () => {
        dispatch({ type: 'TOGGLE_ACTIVE_COIN_CODE', payload: coinCode });
    }

    return (
        <div className="coin">
            <img src={coin.imageURL && `https://www.cryptocompare.com${coin.imageURL}`} alt={coin.name} />
            <div className="coin-code">{coin.code}</div>
            <div className="coin-name">{coin.name}</div>
            {!isFavouritesView ? (
                <FontAwesomeIcon
                    className="coin-star"
                    icon={[coin.showing ? 'fas' : 'far', 'star']}
                    onClick={handleFavouriteClick}
                />
            ) : <div className="coin-price">{formatCoinPrice(coin.price, isCurrencyDollar)}</div>}
        </div>
    );
};

export default memo(CoinListItem);
