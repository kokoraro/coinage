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

const CoinListItem = ({ coin, isCurrencyDollar, coinPrice, isFavourite }: CoinListItemProps) => {
    const dispatch = useDispatch();
    const coinCode = coin.code;

    const handleFavouriteClick = () => {
        dispatch({ type: ActionType.ToggleActiveCoinCode, payload: coinCode });
    };

    return (
        <div className="coin">
            <img src={coin.imageURL && `https://www.cryptocompare.com${coin.imageURL}`} alt={coin.name} />
            <div className="coin-code">{coin.code}</div>
            <div className="coin-name">{coin.name}</div>
            {coinPrice ? (
                <div className="coin-price">{formatCoinPrice(coinPrice, isCurrencyDollar)}</div>
            ) : (
                <button
                    className="button-no-style coin-star"
                    aria-label={`Coin favourite ${isFavourite ? '' : 'un-'}selected`}
                    onClick={handleFavouriteClick}
                >
                    <FontAwesomeIcon icon={[isFavourite ? 'fas' : 'far', 'star']} />
                </button>
            )}
        </div>
    );
};

export default memo(CoinListItem);
