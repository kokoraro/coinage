export default function requestData() {
    const url = 'https://min-api.cryptocompare.com/data/all/coinlist';

    return fetch(url)
        .then(response => response.json())
        .then(data => data.Data)
        .catch(error => error);
}
