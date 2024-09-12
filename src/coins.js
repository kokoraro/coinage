import request from './request';

export function getPrice(code) {
  return request(code).then(data => data.ticker.price);
}