import requestData from './requestData';

export function getData(codes) {
  return requestData(codes)
    .then(data => data)
    .catch(error => error);
}