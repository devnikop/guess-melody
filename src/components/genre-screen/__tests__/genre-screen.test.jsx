import React from "react";
import renderer from "react-test-renderer";

import GenreScreen from "../genre-screen.jsx";

const mock = {
  question: {
    answers: [
      {
        genre: `rock`,
        src: `source1`,
      },
      {
        genre: `jazz`,
        src: `source2`,
      },
    ],
    genre: `rock`,
    type: `genre`,
  },
};

it(`snapshot`, () => {
  const { question } = mock;

  const tree = renderer
    .create(<GenreScreen question={question} onAnswer={jest.fn()} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
