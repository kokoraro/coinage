const mockData = {
  ETH: {
    USD: 842.92,
    EUR: 683.19,
    GBP: 615.39
  },
  LTC: {
    USD: 158.12,
    EUR: 128.36,
    GBP: 115.58
  },
  BTC: {
    USD: 8614.51,
    EUR: 6969.48,
    GBP: 6249.91
  }
}

export default function request(codes) {
  const code = codes.slice(0, 3);
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => mockData[codes] 
        ? resolve(mockData[code])
        : reject({ error: 'User with ' + code + ' not found.' }),
    );
  });
}

request('BTC,ETH,LTC')