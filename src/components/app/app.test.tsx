import * as React from 'react';
import * as renderer from 'react-test-renderer';

import App from './app';

it(`App correctly renders first screen`, () => {
  const tree = renderer
    .create(<App
      renderScreen={jest.fn()}
      mistakes={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
