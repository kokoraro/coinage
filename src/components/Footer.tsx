import React from 'react';
import '../styles/Footer.sass';

interface IconProps {
    url: string;
    icon: string;
}

const Icon = ({ url, icon }: IconProps) => {
    const iconClass = `fab fa-${icon}`;
    return (
        <a href={url}>
            <i className={iconClass} />
        </a>
    );
};

const Footer = () => (
    <footer>
        <p>coded by<a href="https://www.charlietaylorcoder.com"> charlie taylor</a></p>
        <div className="footer-icons">
            <Icon url="http://twitter.com/charlietcoder" icon="twitter" />
            <Icon url="http://www.instagram.com/charlietcoder" icon="instagram" />
            <Icon url="https://codepen.io/chazmcgrill" icon="codepen" />
            <Icon url="https://github.com/chazmcgrill" icon="github" />
        </div>
        <p>uses<a href="https://www.cryptocompare.com/api/"> cryptocompare api</a></p>
    </footer>
);

export default Footer;
