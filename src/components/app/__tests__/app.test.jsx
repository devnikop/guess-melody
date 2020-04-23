import React from "react";
import renderer from "react-test-renderer";

import App from "../app.jsx";

it(`snapshot`, () => {
  const tree = renderer
    .create(<App errorCount={5} gameTime={3} questions={[]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
