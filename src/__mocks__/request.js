const mockData = {
  btc: {
    "ticker": {
    "price": "8598.21572928",
    }
  },
  eth: {
    "ticker": {
      "price": "500.21572928",
    }
  },
  ltc: {
    "ticker": {
      "price": "122.21572928",
    }
  }
}

export default function request(code) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => mockData[code] 
        ? resolve(mockData[code])
        : reject({ error: 'User with ' + code + ' not found.' }),
    );
  });
}