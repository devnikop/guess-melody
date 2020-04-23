import React from "react";
import renderer from "react-test-renderer";

import WelcomeScreen from "../welcome-screen.jsx";

it(`snapshot`, () => {
  const tree = renderer
    .create(
      <WelcomeScreen errorCount={0} onStartButtonClick={jest.fn()} time={0} />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
