import request from './request';

export function getPrice(codes) {
    return request(codes)
        .then(data => data)
        .catch(error => error);
}
