import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";

import App from "./components/app/app.jsx";

import questions from "./mocks/questions";
import { store } from "./store/store-setup";

const init = (gameQuestions) => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };

  ReactDOM.render(
    <Provider store={store}>
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
        questions={gameQuestions}
      />
    </Provider>,
    document.querySelector(`.main`)
  );
};

init(questions);
