import React from 'react';
import renderer from 'react-test-renderer';

import VictoryScene from './victory-scene.jsx';

it(`VictoryScene renders correctly`, () => {
  const tree = renderer
    .create(<VictoryScene
      mistakes={3}
      onReplayClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
