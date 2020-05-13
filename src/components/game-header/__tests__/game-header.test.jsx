import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import renderer from "react-test-renderer";

import GameHeader from "../game-header.jsx";

const initialState = {
  mistakes: 0,
  step: -1,
};

const mockStore = configureStore([]);

it(`snapshot`, () => {
  const store = mockStore(initialState);

  const tree = renderer.create(
    <Provider store={store}>
      <GameHeader />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
