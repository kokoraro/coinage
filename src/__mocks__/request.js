const mockData = {
  btc: {
    "ticker": {
    "base": "BTC",
    "target": "USD",
    "price": "8598.21572928",
    "volume": "90138.57150030",
    "change": "-90.30281903"
    },
    "timestamp": 1518445621,
    "success": true,
    "error": ""
  }
}

export default function request(code) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        mockData[code] ? resolve(mockData[code])
          : reject({
            error: 'User with ' + code + ' not found.',
          }),
    );
  });
}