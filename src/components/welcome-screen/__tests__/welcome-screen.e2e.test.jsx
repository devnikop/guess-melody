import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import WelcomeScreen from "../welcome-screen.jsx";

Enzyme.configure({ adapter: new Adapter() });

it(`Click on button correctly works`, () => {
  const clickHandler = jest.fn();
  const component = shallow(
    <WelcomeScreen errorCount={0} onClick={clickHandler} time={0} />
  );

  const startButton = component.find(`.welcome__button`);
  startButton.simulate(`click`);

  expect(clickHandler).toHaveBeenCalledTimes(1);
});
