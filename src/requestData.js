export default function requestData(codes) {
  const url = 'https://min-api.cryptocompare.com/data/all/coinlist'

  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}