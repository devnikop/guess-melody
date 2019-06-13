import axios from 'axios';
import {ActionCreator} from './reducer/user/user';

const createAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 5000,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    // dispatch(ActionCreator.requiredAuthorization(true));
    return response;
  };
  const onFail = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requiredAuthorization(true));
    }
    return err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  return api;
};

export {createAPI};
