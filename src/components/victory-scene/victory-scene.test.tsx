import {MemoryRouter} from 'react-router-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import VictoryScene from './victory-scene';

it(`VictoryScene renders correctly`, () => {
  const tree = renderer
    .create(<MemoryRouter>
      <VictoryScene
        mistakes={3}
        onClick={jest.fn()}
      />
      </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
