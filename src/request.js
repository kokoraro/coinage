export default function request(codes) {
  const url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms='
  const from = codes.join(',');

  return fetch(`${url}${from}&tsyms=USD,GBP`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}