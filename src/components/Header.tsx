import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface HeaderProps {
    onRefresh: () => void;
    loadingPrice: boolean;
}

interface ControlItemProps {
    icon: IconProp;
    text?: string;
    onClick: () => void;
    iconSpin?: boolean;
}

const ControlItem = ({ icon, text, onClick, iconSpin }: ControlItemProps) => (
    <div className="control-item" onClick={onClick}>
        <FontAwesomeIcon icon={icon} spin={iconSpin} />
        {text && <p>{text}</p>}
    </div>
);

const Header = ({ onRefresh, loadingPrice }: HeaderProps): JSX.Element => (
    <div className="header">
        <h1>coinage</h1>

        <div className="controls">
            <ControlItem icon="star" text="Favourites" onClick={onRefresh} />
            <ControlItem icon="list" text="Full List" onClick={onRefresh} />
            <ControlItem icon="sync" onClick={onRefresh} iconSpin={loadingPrice} />
            <ControlItem icon="cog" onClick={onRefresh} />
        </div>
    </div>
);

export default Header;
