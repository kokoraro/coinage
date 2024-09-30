import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface HeaderProps {
    onRefresh: () => void;
    loadingPrice: boolean;
    onSelectFavourites: () => void;
    onSelectList: () => void;
    isFavouritesView: boolean;
    onClickCurrency: () => void;
    currDollar: boolean;
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
        {text && <p>{text}</p>}
    </div>
);

const Header = ({
    onRefresh,
    loadingPrice,
    onSelectFavourites,
    onSelectList,
    isFavouritesView,
    onClickCurrency,
    currDollar
}: HeaderProps): JSX.Element => (
    <div className="header">
        <h1>coinage</h1>

        <div className="controls">
            <ControlItem icon="star" active={isFavouritesView} text="Favourites" onClick={onSelectFavourites} />
            <ControlItem icon="list" active={!isFavouritesView} text="Full List" onClick={onSelectList} />
            <ControlItem icon="sync" onClick={onRefresh} iconSpin={loadingPrice} />
            <ControlItem icon={currDollar ? 'pound-sign' : 'dollar-sign'} onClick={onClickCurrency} />
            <ControlItem icon="cog" onClick={onClickCurrency} />
        </div>
    </div>
);

export default Header;
