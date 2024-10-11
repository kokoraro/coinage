import React, { memo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useQuery } from 'react-query';
import { fetchNews, NewsResult } from './api/newsFeed';
import { CoinPrice, fetchCoinPrice } from './api/coins';
import { useGlobalStateContext } from './global-state/hooks';
import { ActionType } from './global-state/types';

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
    active?: boolean;
}

const ControlItem = memo(({ icon, text, onClick, iconSpin, active }: ControlItemProps) => (
    <div className={`control-item ${active ? 'active' : ''}`} onClick={onClick} data-testid={icon}>
        <FontAwesomeIcon icon={icon} spin={iconSpin} data-testid={iconSpin ? 'loading-spinner' : ''} />
        {text && <p className="control-item-text">{text}</p>}
    </div>
));

ControlItem.displayName = 'ControlItem';

const Header = (): JSX.Element => {
    const { state, dispatch } = useGlobalStateContext();

    const { isLoading: isLoadingPrice, refetch: refetchCoinPrice } = useQuery<CoinPrice, Error>(
        'coinsPrice',
        () => fetchCoinPrice(state.activeCoinCodes),
        {
            enabled: false,
        },
    );
    const { refetch: refetchNews } = useQuery<NewsResult, Error>('news', fetchNews, { enabled: false });

    const handleToggleFavourites = useCallback(() => {
        dispatch({ type: ActionType.ToggleIsFavourites });
    }, [dispatch]);

    const handleToggleIsDollar = useCallback(() => {
        dispatch({ type: ActionType.ToggleCurrencyDollar });
    }, [dispatch]);

    const handleRefresh = useCallback(() => {
        void refetchCoinPrice();
        void refetchNews();
    }, [refetchCoinPrice, refetchNews]);

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
};

export default memo(Header);
