import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Coin, CoinPrice } from '../api/coins';
import { ActionType, useDispatch } from '../../utils/GlobalStateProvider';
import { formatCoinPrice } from './utils';

interface CoinListItemProps {
    coin: Coin;
    isCurrencyDollar: boolean;
    coinPrice?: CoinPrice;
    isFavourite: boolean;
}

const CoinListItem = ({
    coin,
    isCurrencyDollar,
    coinPrice,
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
                    onClick={handleFavouriteClick}
                />
            )}
        </div>
    );
};

export default memo(CoinListItem);
