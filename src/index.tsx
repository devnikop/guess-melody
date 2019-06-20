import {compose} from 'recompose';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import thunk from 'redux-thunk';

import {createAPI} from './api';
import {Operation as DataOperation} from './reducer/data/data';
import {Operation as UserOperation} from './reducer/user/user';
import reducer from './reducer/index';
import withChangeScreen from './hocs/with-change-screen/with-change-screen';

import App from './components/app/app';

declare const __REDUX_DEVTOOLS_EXTENSION__: () => any;

const gameSettings = {
  errorCount: 8,
  gameTime: 5,
};

const AppWrapped = withChangeScreen(App);

const init = () => {
  const {errorCount, gameTime} = gameSettings;
  const api = createAPI(() =>
    history.pushState(null, null, `/login`));
  const store = createStore(
      reducer,
      compose(
          applyMiddleware(thunk.withExtraArgument(api)),
          __REDUX_DEVTOOLS_EXTENSION__ ? __REDUX_DEVTOOLS_EXTENSION__() : (a) => a
      )
  );

  store.dispatch(DataOperation.loadQuestions());
  store.dispatch(UserOperation.checkAuth());

  ReactDOM.render(
      <Provider store={store}>
        <AppWrapped
          maxMistakes={errorCount}
          gameTime={gameTime}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
