import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app/app.jsx";

import questions from "./mocks/questions.js";

const init = (gameQuestions) => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
  };

  ReactDOM.render(
    <App
      gameTime={settings.gameTime}
      errorCount={settings.errorCount}
      questions={gameQuestions}
    />,
    document.querySelector(`.main`)
  );
};

init(questions);
