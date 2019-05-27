import React from 'react';
import renderer from 'react-test-renderer';

import MistakeScreen from './mistakeScreen.jsx';

const mock = {
  mistakes: 2,
};

it(`MistakeScreen correctly renders`, () => {
  const {mistakes} = mock;

  const tree = renderer
    .create(<MistakeScreen
      mistakes={mistakes}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
