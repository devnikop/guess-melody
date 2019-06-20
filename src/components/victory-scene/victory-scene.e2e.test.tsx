import * as React from 'react';
import {shallow} from 'enzyme';

import VictoryScene from './victory-scene';

it(`Click on button should call onClick`, () => {
  const onClickMock = jest.fn();
  const screen = shallow(<VictoryScene
    mistakes={1}
    onClick={onClickMock}
  />);

  const button = screen.find(`.replay`);
  button.simulate(`click`);

  expect(onClickMock).toHaveBeenCalledTimes(1);
});
