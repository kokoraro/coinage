import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>designed and coded by <a href="https://www.charlietaylorcoder.com">charlie taylor</a></p>
      <div className="footer-icons">
        <a href="http://twitter.com/charlietcoder"><i className="fa fa-twitter"></i></a>
        <a href="http://www.instagram.com/charlietcoder"><i className="fa fa-instagram"></i></a>
        <a href="https://codepen.io/chazmcgrill"><i className="fa fa-codepen"></i></a>
        <a href="https://github.com/chazmcgrill"><i className="fa fa-github"></i></a>
      </div>
      <p>data from <a href="https://www.cryptocompare.com/api/">cryptocompare api</a></p>
    </footer>
  )
}

export default Footer;