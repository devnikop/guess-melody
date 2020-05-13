import React from "react";
import renderer from "react-test-renderer";

import AudioPlayer from "../audio-player.jsx";

const createNodeMock = (element) => {
  if (element.type === `audio`) {
    return {};
  }
};

it(`snapshot`, () => {
  const tree = renderer.create(
    <AudioPlayer
      isPlaying={false}
      onPlayButtonClick={jest.fn()}
      src={`source`}
    />,
    { createNodeMock }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
