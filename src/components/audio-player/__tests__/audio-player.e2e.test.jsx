import React from "react";
import { mount } from "enzyme";

import AudioPlayer from "../audio-player.jsx";

const Selector = {
  PLAY_BUTTON: `.track__button`,
};

it.skip(`click on play call callback`, () => {
  const clickHandler = jest.fn();

  const wrapper = mount(
    <AudioPlayer
      isPlaying={false}
      onPlayButtonClick={clickHandler}
      src={`source`}
    />
  );
  const playButton = wrapper.find(Selector.PLAY_BUTTON);

  playButton.simulate(`click`);
  wrapper.update();
  expect(clickHandler).toHaveBeenCalledTimes(1);
});
