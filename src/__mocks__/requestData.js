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

export default function requestData() {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () => mockData.Data 
        ? resolve(mockData.Data)
        : reject({ 
          error: 'Data for BTC not found.' 
        }),
    );
  });
}