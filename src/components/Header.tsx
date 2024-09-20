import React from 'react';

interface HeaderProps {

}

const Header = ({ ...props }: HeaderProps): JSX.Element => (
    <div style={{ padding: 20 }}>
        <h1>Title</h1>
    </div>
);

export default Header;
