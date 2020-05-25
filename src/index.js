import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch.jsx";

import { store } from "./reducer/store-setup";
import { Operation as DataOperation } from "./reducer/data/data";
import { ActionCreator, Operation as UserOperation } from "./reducer/user/user";

const AppWrapped = withScreenSwitch(App);

store.dispatch(DataOperation.loadQuestions());
store.dispatch(ActionCreator.requireAuthorization(true));
store.dispatch(UserOperation.tryAuthorization(`sadfi@isdf.ru`, `passw`));

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.querySelector(`.main`)
  );
};

init();
