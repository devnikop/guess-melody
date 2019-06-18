import axios from 'axios';

const createAPI = (onLoginFail) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };
  const onFail = (err) => {
    if (err.status === 403) {
      onLoginFail();
    }
    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export {createAPI};
