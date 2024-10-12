import { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatCoinPrice } from '../utils/formatCoinPrice';
import { useAtom } from 'jotai';
import { favouriteCoinCodesDerivedAtom, isCurrencyDollarAtom } from '../../../store/global';
import { Coin } from '../types/Coin';
import { CoinPrice } from '../types/CoinPrice';

interface CoinListItemProps {
    coin: Coin;
    coinPrice?: CoinPrice;
    isFavourite: boolean;
}

const CoinListItem = ({ coin, coinPrice, isFavourite }: CoinListItemProps) => {
    const [, toggleCoinCode] = useAtom(favouriteCoinCodesDerivedAtom);
    const [isCurrencyDollar] = useAtom(isCurrencyDollarAtom);
    const coinCode = coin.code;

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
                    aria-label={`${isFavourite ? 'un' : ''}favourite coin`}
                    onClick={() => toggleCoinCode(coinCode)}
                >
                    <FontAwesomeIcon icon={[isFavourite ? 'fas' : 'far', 'star']} />
                </button>
            )}
        </div>
    );
};

export default memo(CoinListItem);
