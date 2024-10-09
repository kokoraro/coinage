import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Coin, CoinPrice } from '../api/coins';
import { formatCoinPrice } from './utils';
import { ActionType } from '../global-state/types';
import { useDispatch } from '../global-state/hooks';

interface CoinListItemProps {
    coin: Coin;
    isCurrencyDollar: boolean;
    coinPrice?: CoinPrice;
    isFavourite: boolean;
}

// TODO: put into utils
const formatCoinPrice = (coinPrice: CoinPrice, isCurrencyDollar: boolean) => {
    const currency = isCurrencyDollar ? 'USD' : 'GBP';
    const currSymbol = isCurrencyDollar ? '$' : '£';
    const price = Number(coinPrice[currency]);
    const value = price >= 1 ? price.toFixed(2) : price.toFixed(4);

    return `${currSymbol}${value}`;
}

// TODO: Make two different components for coins?
const CoinListItem = ({
    coin,
    isCurrencyDollar,
    coinPrice,
    isFavourite,
    isFavourite,
}: CoinListItemProps) => {
    const dispatch = useDispatch();
    const coinCode = coin.code;

    const handleFavouriteClick = () => {
        dispatch({ type: ActionType.ToggleActiveCoinCode, payload: coinCode });
    }

    return (
        <div className="coin">
            <img src={coin.imageURL && `https://www.cryptocompare.com${coin.imageURL}`} alt={coin.name} />
            <div className="coin-code">{coin.code}</div>
            <div className="coin-name">{coin.name}</div>
            {coinPrice ? <div className="coin-price">{formatCoinPrice(coinPrice, isCurrencyDollar)}</div> : (
                <FontAwesomeIcon
                    className="coin-star"
                    icon={[isFavourite ? 'fas' : 'far', 'star']}
                    icon={[isFavourite ? 'fas' : 'far', 'star']}
                    onClick={handleFavouriteClick}
                />
            )}
        </div>
    );
};

export default memo(CoinListItem);
