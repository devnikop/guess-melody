import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {AudioPlayer} from './audio-player';

it(`AudioPlayer correctly renders`, () => {
  const tree = renderer
    .create(<AudioPlayer
      isPlaying={true}
      isLoading={true}
      onPlayButtonClick={jest.fn()}
      renderAudio={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
