import React from "react";
import renderer from "react-test-renderer";

import ArtistScreen from "../artist-screen.jsx";

const mock = {
  question: {
    answers: [
      {
        picture: `source`,
        artist: `John`,
      },
      {
        picture: `source2`,
        artist: `Jim`,
      },
    ],
    song: {
      artist: `artist`,
      src: `source`,
    },
    type: `artist`,
  },
};

it(`snapshot`, () => {
  const { question } = mock;

  const tree = renderer
    .create(<ArtistScreen onAnswer={jest.fn()} question={question} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
