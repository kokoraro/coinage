const mockData = {
  Data: { BTC: { Id: "1182"} }
}

export default function requestData(codes) {
  const code = codes[0];
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => mockData.Data[code] 
        ? resolve(mockData.Data[code])
        : reject({ 
          error: 'Data for ' + code + ' not found.' 
        }),
    );
  });
}