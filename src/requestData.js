export default function requestData(codes) {
  const url = 'https://min-api.cryptocompare.com/data/all/coinlist'

  return fetch(url)
    .then(response => response.json())
    .then(data => codes.map((code, index) => (
      { 
        id: index, 
        name: data.Data[code].CoinName,
        imageURL: data.Data[code].ImageUrl,
        code: code,
        showing: index < 6
      }
    )))
    .catch(error => error);
}