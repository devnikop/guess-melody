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

const genreScreenState = {
  mistakes: 0,
  step: 0
};

const artistScreenState = {
  mistakes: 0,
  step: 1,
};

const middlewares = [];
const mockStore = configureStore(middlewares);

const createNodeMock = (element) => {
  if (element.type === `audio`) {
    return {};
  }
}

describe(`app snapshots:`, () => {
  it(`render welcome-screen with initial state`, () => {
    const { questions } = mock;
    const store = mockStore(initialState);

    const tree = renderer.create(
      <Provider store={store}>
        <App
          errorCount={5}
          gameTime={3}
          questions={questions}
        />
      </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render genre-screen with updated state`, () => {
    const { questions } = mock;
    const store = mockStore(genreScreenState);

    const tree = renderer.create(
      <Provider store={store} >
        <App
          errorCount={5}
          gameTime={3}
          questions={questions}
        />
      </Provider>,
      { createNodeMock }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`render artist-screen with updated state`, () => {
    const { questions } = mock;
    const store = mockStore(artistScreenState);

    const tree = renderer.create(
      <Provider store={store}>
        <App
          errorCount={5}
          gameTime={3}
          questions={questions}
        />
      </Provider>,
      { createNodeMock }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
