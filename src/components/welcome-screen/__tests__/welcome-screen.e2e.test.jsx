import React from "react";
import { shallow } from "enzyme";

import WelcomeScreen from "../welcome-screen.jsx";

it(`Click on button correctly works`, () => {
  const clickHandler = jest.fn();
  const component = shallow(
    <WelcomeScreen errorCount={0} onClick={clickHandler} time={0} />
  );

  const startButton = component.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
