import React from "react";
import { mount } from "enzyme";

import AudioPlayer from "../audio-player.jsx";

const Selector = {
  PLAY_BUTTON: `.track__button`,
};

it.skip(`click on play call callback`, () => {
  const spyButtonClick = jest.fn();

  const wrapper = mount(
    <AudioPlayer
      isPlaying={true}
      onPlayButtonClick={spyButtonClick}
      src={`source`}
    />
  );

  wrapper.find(Selector.PLAY_BUTTON).simulate(`click`);
  expect(spyButtonClick).toHaveBeenCalled();
});
