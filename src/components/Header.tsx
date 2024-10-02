import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useQuery } from 'react-query';
import { fetchNews, NewsResult } from './api/newsFeed';

interface HeaderProps {
    onRefresh: () => void;
    loadingPrice: boolean;
    onSelectFavourites: () => void;
    onSelectList: () => void;
    isFavouritesView: boolean;
    onClickCurrency: () => void;
    isCurrencyDollar: boolean;
}

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
    active?: boolean;
}

const ControlItem = ({ icon, text, onClick, iconSpin, active }: ControlItemProps) => (
    <div className={`control-item ${active ? 'active' : ''}`} onClick={onClick}>
        <FontAwesomeIcon icon={icon} spin={iconSpin} />
        {text && <p className="control-item-text">{text}</p>}
    </div>
);

const Header = ({
    onRefresh,
    loadingPrice,
    onSelectFavourites,
    onSelectList,
    isFavouritesView,
    onClickCurrency,
    isCurrencyDollar
}: HeaderProps): JSX.Element => {
    const { refetch: refetchNews } = useQuery<NewsResult, Error>('news', fetchNews, { enabled: false });

    const handleRefresh = () => {
        onRefresh();
        refetchNews();
    }

    return (
        <div className="header">
            <h1>coinage</h1>

            <div className="controls">
                <ControlItem icon="star" active={isFavouritesView} text="Favourites" onClick={onSelectFavourites} />
                <ControlItem icon="list" active={!isFavouritesView} text="Full List" onClick={onSelectList} />
                <ControlItem icon={isCurrencyDollar ? 'pound-sign' : 'dollar-sign'} onClick={onClickCurrency} />
                <ControlItem icon="sync" onClick={handleRefresh} iconSpin={loadingPrice} />
                {/* <ControlItem icon="cog" onClick={onClickSettings} /> */}
            </div>
        </div>
    );
}

export default Header;
