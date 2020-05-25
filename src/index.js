import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";
import withScreenSwitch from "./hocs/with-screen-switch/with-screen-switch.jsx";
import { store } from "./store/store-setup";
import { Operation } from "./store/reducer.js";

const AppWrapped = withScreenSwitch(App);

store.dispatch(Operation.loadQuestions());

const init = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppWrapped />
    </Provider>,
    document.querySelector(`.main`)
  );
};

init();
