import { shallow } from "enzyme";
import React from "react";

import { GenreScreen } from "../genre-screen.jsx";

const mock = {
  question: {
    answers: [
      {
        genre: `rock`,
        src: `source1`,
      },
      {
        genre: `jazz`,
        src: `source2`,
      },
    ],
    genre: `rock`,
    type: `genre`,
  },
};

it(`form submit`, () => {
  const { question } = mock;

  const submitHandler = jest.fn();
  const component = shallow(
    <GenreScreen onAnswer={submitHandler} question={question} />
  );

  const form = component.find(`.game__tracks`);
  form.simulate(`submit`, {
    preventDefault: jest.fn(),
  });

  expect(submitHandler).toHaveBeenCalled();
});
