import React from 'react';

interface HeaderProps {

}

const Header = ({ ...props }: HeaderProps): JSX.Element => (
    <div className="header">
        <h1>coinage</h1>
        <p>favs / list / settings</p>
    </div>
);

export default Header;
