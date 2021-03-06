import React from 'react';
import renderer from 'react-test-renderer';

import LosingScene from './losing-scene.jsx';

it(`LosingScene renders correctly`, () => {
  const tree = renderer
    .create(<LosingScene
      onClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
