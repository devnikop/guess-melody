import React from "react";
import renderer from "react-test-renderer";

import WelcomeScreen from "../welcome-screen.jsx";

it(`Welcome screen renders correctly`, () => {
  const tree = renderer
    .create(<WelcomeScreen time={0} errorCount={0} onClick={jest.fn()} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
