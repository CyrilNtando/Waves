import axios from 'axios';

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return data
      ? axios[method](path, data)
      : axios[method](path)
          .then(res => {
            console.log(res.data);
            return resolve(res.data);
          })
          .catch(err => {
            return reject(err.response.data.error);
          });
  });
}
