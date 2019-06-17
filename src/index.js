import {BrowserRouter} from 'react-router-dom';
import {compose} from 'recompose';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import {createAPI} from './api';
import {Operation} from './reducer/data/data';
import reducer from './reducer/index';
import withChangeScreen from './hocs/with-change-screen/with-change-screen';

import App from './components/app/app.jsx';

const gameSettings = {
  errorCount: 3,
  gameTime: 5,
};

const AppWrapped = withChangeScreen(App);

const init = () => {
  const {errorCount, gameTime} = gameSettings;
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (a) => a
      )
  );

  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <AppWrapped
            maxMistakes={errorCount}
            gameTime={gameTime}
          />
        </BrowserRouter>
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
