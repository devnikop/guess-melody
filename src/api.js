import axios from "axios";
import { ActionCreator } from "./reducer/user/user";

export const configureAPI = (dispatch) => {
  const api = axios.create({
    baseURL: `https://es31-server.appspot.com/guess-melody`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = response => response;
  const onError = (err) => {
    if (err.response.status === 403) {
      dispatch(ActionCreator.requireAuthorization(true));
    }
    return err;
  }

  api.interceptors.response.use(onSuccess, onError);

  return api;
}