import { shallow } from "enzyme";
import React from "react";

import AudioPlayer from "../audio-player.jsx";

const Selector = {
  PLAY_BUTTON: `.track__button`,
};

it(`click on button call onPlayButtonClick`, () => {
  const spyButtonClick = jest.fn();

  const wrapper = shallow(
    <AudioPlayer
      isLoaded={false}
      isPlaying={false}
      onPlayButtonClick={spyButtonClick}
      renderAudio={jest.fn()}
    />
  );

  wrapper.find(Selector.PLAY_BUTTON).simulate(`click`);
  expect(spyButtonClick).toHaveBeenCalled();
});
