import React from "react";
import renderer from "react-test-renderer";

import AudioPlayer from "../audio-player.jsx";

it(`snapshot`, () => {
  const tree = renderer.create(
    <AudioPlayer
      isLoaded={false}
      isPlaying={false}
      onPlayButtonClick={jest.fn()}
      renderAudio={jest.fn()}
    />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
