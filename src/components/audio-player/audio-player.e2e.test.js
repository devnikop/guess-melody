import React from 'react';
import {shallow} from 'enzyme';

import {AudioPlayer} from './audio-player.jsx';

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
};

it(`Simulating AudioPlayer play&pause`, () => {
  HTMLMediaElement.prototype.pause = () => {};

  const {src} = mock;
  const handlerClick = jest.fn();

  const audioPlayer = shallow(<AudioPlayer
    isPlaying={false}
    onPlayButtonClick={handlerClick}
    src={src}
  />);

  const trackButton = audioPlayer.find(`.track__button.track__button--play`);
  trackButton.simulate(`click`);
  expect(handlerClick).toHaveBeenCalledTimes(1);
  expect(audioPlayer.state(`isPlaying`)).toBe(true);

  trackButton.simulate(`click`);
  expect(handlerClick).toHaveBeenCalledTimes(2);
  expect(audioPlayer.state(`isPlaying`)).toBe(false);
});

