import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

it(`App correctly renders first screen`, () => {
  const tree = renderer
    .create(<App
      renderScreen={jest.fn()}
      mistakes={0}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
