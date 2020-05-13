import { shallow } from "enzyme";
import React from "react";

import { GenreScreen } from "../genre-screen.jsx";

const Selector = {
  GAME_TRACKS: `.game__tracks`,
}

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
  const spyFormSumbit = jest.fn();

  const component = shallow(
    <GenreScreen onAnswer={spyFormSumbit} question={question} />
  );

  const form = component.find(Selector.GAME_TRACKS);
  form.simulate(`submit`, {
    preventDefault: jest.fn(),
  });
  expect(spyFormSumbit).toHaveBeenCalled();
});
