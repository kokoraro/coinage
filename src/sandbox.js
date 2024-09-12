const fetch = require('node-fetch');

function getCoins(id) {
  const url = `https://api.cryptonator.com/api/ticker/${id}-usd`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      return ({
        name: data.ticker.base,
        price: data.ticker.price
      });
    })
    .catch(err => console.log(err));
}

console.log(getCoins('btc'));

