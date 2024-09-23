import React from 'react';
import './Footer.sass';

const Footer = () => (
    <footer>
        <p>
            coded by
            <a href="https://www.charlietaylorcoder.com"> charlie taylor</a>
        </p>
        <div className="footer-icons">
            <a href="http://twitter.com/charlietcoder"><i className="fab fa-twitter" /></a>
            <a href="http://www.instagram.com/charlietcoder"><i className="fab fa-instagram" /></a>
            <a href="https://codepen.io/chazmcgrill"><i className="fab fa-codepen" /></a>
            <a href="https://github.com/chazmcgrill"><i className="fab fa-github" /></a>
        </div>
        <p>
            uses
            <a href="https://www.cryptocompare.com/api/"> cryptocompare api</a>
        </p>
    </footer>
);

export default Footer;
