import * as React from 'react';
import * as renderer from 'react-test-renderer';

import VictoryScene from './victory-scene.jsx';

it(`VictoryScene renders correctly`, () => {
  const tree = renderer
    .create(<VictoryScene
      mistakes={3}
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
