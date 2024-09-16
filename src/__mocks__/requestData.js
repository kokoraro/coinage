const mockData = {
  Data: { 
    BTC: { 
      Id: "1182", 
      name: "Bitcoin", 
      imageURL: "/media/19633/btc.png", 
      code: "BTC" 
    }
  }
}

export default function requestData(codes) {
  const code = codes[0];
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => mockData.Data[code] 
        ? resolve([mockData.Data[code]])
        : reject({ 
          error: 'Data for ' + code + ' not found.' 
        }),
    );
  });
}