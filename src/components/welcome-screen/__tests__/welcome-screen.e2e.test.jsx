import { shallow } from "enzyme";
import React from "react";

import { WelcomeScreen } from "../welcome-screen.jsx";

const Selector = {
  WELCOME_BUTTON: `.welcome__button`,
}

it(`welcome button click`, () => {
  const spyButtonClick = jest.fn();
  const wrapper = shallow(
    <WelcomeScreen
      errorCount={0}
      incrementQuestion={spyButtonClick}
      time={0}
    />
  );

  wrapper.find(Selector.WELCOME_BUTTON).simulate(`click`);
  expect(spyButtonClick).toHaveBeenCalled();
});
