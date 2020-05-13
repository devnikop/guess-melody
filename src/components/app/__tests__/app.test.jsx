import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import React from "react";
import renderer from "react-test-renderer";

import App from "../app.jsx";

const mock = {
  questions: [
    {
      answers: [
        {
          genre: `rock`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `pop`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `jazz`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `rock`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
      ],
      genre: `rock`,
      type: `genre`,
    },
    {
      answers: [
        {
          picture: `path.jpg`,
          artist: `John Snow`,
        },
        {
          picture: `path.jpg`,
          artist: `Jack Daniels`,
        },
        {
          picture: `path.jpg`,
          artist: `Jim Beam`,
        },
      ],
      song: {
        artist: `Jim Beam`,
        src: `path.mp3`,
      },
      type: `artist`,
    },
  ],
};

const initialState = {
  mistakes: 0,
  step: -1,
};

const middlewares = [];
const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

it(`renders welcome screen correctly`, () => {
  const { questions } = mock;

  const tree = renderer.create(
    <Provider store={store}>
      <App
        errorCount={5}
        gameTime={3}
        questions={questions}
        questionStep={-1}
      />
    </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
