import * as React from 'react';
import {shallow} from 'enzyme';

import {WelcomeScreen} from './welcome-screen';

it(`Welcome-screen's button work correctly`, () => {
  const clickHandler = jest.fn();
  const welcomeScreen = shallow(<WelcomeScreen
    time={0}
    errorCount={0}
    onClick={clickHandler}
  />);

  const startButton = welcomeScreen.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
