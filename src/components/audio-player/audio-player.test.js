import React from 'react';
import renderer from 'react-test-renderer';

import {AudioPlayer} from './audio-player.jsx';

const mock = {
  src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
};

it(`AudioPlayer correctly renders`, () => {
  const {src} = mock;

  const tree = renderer
    .create(<AudioPlayer
      isPlaying={true}
      isLoading={true}
      onPlayButtonClick={jest.fn()}
      renderAudio={jest.fn()}
      src={src}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
