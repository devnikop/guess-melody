import React from "react";
import renderer from "react-test-renderer";

import { WelcomeScreen } from "../welcome-screen.jsx";

it(`snapshot`, () => {
  const tree = renderer.create(
    <WelcomeScreen errorCount={0} time={0} incrementQuestion={jest.fn()} />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
