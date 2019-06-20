import {MemoryRouter} from 'react-router-dom';
import * as React from 'react';
import * as renderer from 'react-test-renderer';

import LosingScene from './losing-scene';

it(`LosingScene renders correctly`, () => {
  const tree = renderer
    .create(<MemoryRouter>
        <LosingScene
          onClick={jest.fn()}
        />
      </MemoryRouter>)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
