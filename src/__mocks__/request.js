const mockData = {
  ETH: {
    USD: 842.92,
    GBP: 615.39
  },
  LTC: {
    USD: 158.12,
    GBP: 115.58
  },
  BTC: {
    USD: 8614.51,
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