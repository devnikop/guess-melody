import * as React from 'react';
import {shallow} from 'enzyme';

import LosingScene from './losing-scene';

it(`Click on button should call onClick`, () => {
  const onClickMock = jest.fn();
  const screen = shallow(<LosingScene
    onClick={onClickMock}
  />);

  const button = screen.find(`.replay`);
  button.simulate(`click`);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
