import React from "react";
import renderer from "react-test-renderer";

import GameHeader from "../game-header.jsx";

it(`snapshot`, () => {
  const tree = renderer.create(<GameHeader />).toJSON();

  expect(tree).toMatchSnapshot();
});
