import React from 'react';
import ReactDOM from 'react-dom';

import {App} from './components/app/app.jsx';
import {questions} from './mocks/questions';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 5,
    errorCount: 3,
    onWelcomeButtonClick: () => {},
  };
  ReactDOM.render(
      <App
        errorCount={settings.errorCount}
        gameTime={settings.gameTime}
        questions={gameQuestions}
      />,
      document.querySelector(`.main`)
  );
};

init(questions);
