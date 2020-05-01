import React from "react";
import renderer from "react-test-renderer";

import ArtistScreen from "../artist-screen.jsx";
import { element } from "prop-types";

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

const createNodeMock = (element) => {
  if (element.type === `audio`) {
    return {};
  }
};

it(`snapshot`, () => {
  const { question } = mock;

  const tree = renderer.create(
    <ArtistScreen onAnswer={jest.fn()} question={question} />,
    { createNodeMock }
  );
  expect(tree.toJSON()).toMatchSnapshot();
});
