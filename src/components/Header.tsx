import React from 'react';

interface HeaderProps {

}

const Header = ({ ...props }: HeaderProps): JSX.Element => (
    <div className="header">
        <h1>Title</h1>
    </div>
);

export default Header;
