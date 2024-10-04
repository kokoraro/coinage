import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useQuery } from 'react-query';
import { fetchNews, NewsResult } from './api/newsFeed';
import { fetchCoinPrice } from './api/coins';
import { useGlobalStateContext } from '../utils/GlobalStateProvider';

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
    active?: boolean;
}

const ControlItem = memo(({ icon, text, onClick, iconSpin, active }: ControlItemProps) => (
    <div className={`control-item ${active ? 'active' : ''}`} onClick={onClick}>
        <FontAwesomeIcon icon={icon} spin={iconSpin} />
        {text && <p className="control-item-text">{text}</p>}
    </div>
));

const Header = (): JSX.Element => {
    const { state, dispatch } = useGlobalStateContext();
    const { isLoading: isLoadingPrice, refetch: refetchCoinPrice } = useQuery<{}, Error>('coinsPrice', () => fetchCoinPrice(state.activeCoinCodes), { enabled: false });
    const { refetch: refetchNews } = useQuery<NewsResult, Error>('news', fetchNews, { enabled: false });

    const handleToggleFavourites = useCallback(() => {
        dispatch({ type: 'TOGGLE_IS_FAVOURITES' });
    }, [dispatch]);

    const handleToggleIsDollar = useCallback(() => {
        dispatch({ type: 'TOGGLE_CURRENCY_DOLLAR' });
    }, [dispatch]);

    const handleRefresh = useCallback(() => {
        refetchCoinPrice();
        refetchNews();
    }, [refetchCoinPrice, refetchNews])

    return (
        <div className="header">
            <h1>coinage</h1>

            <div className="controls">
                <ControlItem icon="star" active={state.isFavouritesView} text="Favourites" onClick={handleToggleFavourites} />
                <ControlItem icon="list" active={!state.isFavouritesView} text="Full List" onClick={handleToggleFavourites} />
                <ControlItem icon={state.isCurrencyDollar ? 'pound-sign' : 'dollar-sign'} onClick={handleToggleIsDollar} />
                <ControlItem icon="sync" onClick={handleRefresh} iconSpin={isLoadingPrice} />
            </div>
        </div>
    );
}

export default memo(Header);
