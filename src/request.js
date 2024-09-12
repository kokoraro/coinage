function request(code) {
  const cors = 'https://cors-anywhere.herokuapp.com/'
  return fetch(`${cors}https://api.cryptonator.com/api/ticker/${code}-usd`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error));
}

module.exports = request;