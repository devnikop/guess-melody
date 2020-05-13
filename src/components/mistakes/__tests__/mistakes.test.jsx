import React from "react";
import renderer from "react-test-renderer";

import { Mistakes } from "../mistakes.jsx";

it(`snapshot`, () => {
  const tree = renderer.create(<Mistakes mistakes={2} />);

  expect(tree).toMatchSnapshot();
});
