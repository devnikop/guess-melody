import { shallow } from "enzyme";
import React from "react";

import { GenreScreen } from "../genre-screen.jsx";

const Selector = {
  GAME_INPUT: `.game__input`,
  GAME_TRACKS: `.game__tracks`,
}

const mock = {
  activePlayer: -1,
  answers: [false, false],
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

describe(`GenreScreen`, () => {
  const spyOnFormSumbit = jest.fn();
  const spyOnInputChange = jest.fn();

  let wrapper;
  beforeEach(() => {
    const { activePlayer, answers, question } = mock;
    wrapper = shallow(
      <GenreScreen
        activePlayer={activePlayer}
        answers={answers}
        question={question}
        onFormSubmit={spyOnFormSumbit}
        onInputChange={spyOnInputChange}
        onPlayButtonClick={jest.fn()}
      />
    );
  });

  it(`call props onFormSubmit when submit form`, () => {
    const { answers } = mock;
    const form = wrapper.find(Selector.GAME_TRACKS);
    form.simulate(`submit`, {
      preventDefault: jest.fn(),
    });

    expect(spyOnFormSumbit).toHaveBeenCalledWith(answers)
  });

  it(`call props onInputChange(1) when change second input`, () => {
    const input = wrapper.find(Selector.GAME_INPUT).at(1);
    input.simulate(`change`);

    expect(spyOnInputChange).toHaveBeenCalledWith(1);
  });
});
