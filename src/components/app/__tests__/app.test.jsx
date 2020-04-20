import React from "react";
import renderer from "react-test-renderer";

import App from "../app.jsx";

it(`App renders correctly`, () => {
  const tree = renderer.create(<App gameTime={3} errorCount={5} />).toJSON();

  expect(tree).toMatchSnapshot();
});
