import { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useQuery } from 'react-query';
import { CoinPrice, fetchCoinPrice } from './api/coins';
import { useAtom } from 'jotai';
import { favouriteCoinCodesDerivedAtom, isCurrencyDollarAtom, isFavouritesViewAtom } from '../store/global';
import { getNews } from '../features/news/api/getNews';
import { NewsResult } from '../features/news/types/NewsResult';

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
    active?: boolean;
    testIdPrefix?: string;
}

const ControlItem = memo(({ icon, text, onClick, iconSpin, active, testIdPrefix }: ControlItemProps) => (
    <div
        className={`control-item ${active ? 'active' : ''}`}
        onClick={onClick}
        data-testid={testIdPrefix ? `${testIdPrefix}${active ? '-active' : ''}` : icon}
    >
        <FontAwesomeIcon icon={icon} spin={iconSpin} data-testid={iconSpin ? 'loading-spinner' : ''} />
        {text && <p className="control-item-text">{text}</p>}
    </div>
));

ControlItem.displayName = 'ControlItem';

const Header = (): JSX.Element => {
    const [isFavouritesView, setIsFavouritesView] = useAtom(isFavouritesViewAtom);
    const [isCurrencyDollar, setIsCurrencyDollar] = useAtom(isCurrencyDollarAtom);
    const [activeCoinCodes] = useAtom(favouriteCoinCodesDerivedAtom);

    const { isLoading: isLoadingPrice, refetch: refetchCoinPrice } = useQuery<CoinPrice, Error>('coinsPrice', () => fetchCoinPrice(activeCoinCodes), {
        enabled: false,
    });
    const { refetch: refetchNews } = useQuery<NewsResult, Error>('news', getNews, { enabled: false });

    const handleToggleFavourites = useCallback(() => {
        setIsFavouritesView(!isFavouritesView);
    }, [isFavouritesView, setIsFavouritesView]);

    const handleToggleIsDollar = useCallback(() => {
        setIsCurrencyDollar(!isCurrencyDollar);
    }, [isCurrencyDollar, setIsCurrencyDollar]);

    const handleRefresh = useCallback(() => {
        void refetchCoinPrice();
        void refetchNews();
    }, [refetchCoinPrice, refetchNews]);

    return (
        <div className="header">
            <h1>coinage</h1>

            <div className="controls">
                <ControlItem icon="star" active={isFavouritesView} text="Favourites" onClick={handleToggleFavourites} testIdPrefix="favourites" />
                <ControlItem icon="list" active={!isFavouritesView} text="Full List" onClick={handleToggleFavourites} testIdPrefix="full-list" />
                <ControlItem icon={isCurrencyDollar ? 'pound-sign' : 'dollar-sign'} onClick={handleToggleIsDollar} />
                <ControlItem icon="sync" onClick={handleRefresh} iconSpin={isLoadingPrice} />
            </div>
        </div>
    );
};

export default memo(Header);
