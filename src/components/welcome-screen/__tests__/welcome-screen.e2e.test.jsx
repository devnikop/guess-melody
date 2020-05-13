import { shallow } from "enzyme";
import React from "react";

import { WelcomeScreen } from "../welcome-screen.jsx";

const Selector = {
  WELCOME_BUTTON: `.welcome__button`,
}

it(`welcome button click`, () => {
  const handlerButtonClick = jest.fn();
  const wrapper = shallow(
    <WelcomeScreen
      errorCount={0}
      incrementQuestion={handlerButtonClick}
      time={0}
    />
  );

  wrapper.find(Selector.WELCOME_BUTTON).simulate(`click`);
  expect(handlerButtonClick).toHaveBeenCalledTimes(1);
});
