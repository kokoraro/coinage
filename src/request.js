export default function request(codes) {
  const to = "USD,GBP";
  const from = codes.join(',');
  return fetch(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${from}&tsyms=${to}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}