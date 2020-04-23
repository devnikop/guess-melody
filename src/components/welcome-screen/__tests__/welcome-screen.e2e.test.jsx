import { shallow } from "enzyme";
import React from "react";

import WelcomeScreen from "../welcome-screen.jsx";

it(`welcome button click`, () => {
  const clickHandler = jest.fn();
  const component = shallow(
    <WelcomeScreen errorCount={0} onStartButtonClick={clickHandler} time={0} />
  );

  const startButton = component.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
