function request(code) {
  return fetch(`https://api.cryptonator.com/api/ticker/${code}-usd`)
    .then(response => response.json())
    .then(data => data);
}

module.exports = request;