import { shallow } from "enzyme";
import React from "react";

import GenreScreen from "../genre-screen.jsx";

const Selector = {
  GAME_INPUT: `.game__input`,
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

describe(`GenreScreen`, () => {
  const spyOnFormSumbit = jest.fn();
  const spyOnInputChange = jest.fn();

  let wrapper;
  beforeEach(() => {
    const { question } = mock;
    wrapper = shallow(
      <GenreScreen
        question={question}
        onFormSubmit={spyOnFormSumbit}
        onInputChange={spyOnInputChange}
        renderAnswer={jest.fn()}
      />
    );
  });

  it(`call props onFormSubmit when submit form`, () => {
    const form = wrapper.find(Selector.GAME_TRACKS);
    form.simulate(`submit`, {
      preventDefault: jest.fn(),
    });

    expect(spyOnFormSumbit).toHaveBeenCalled();
  });

  it(`call props onInputChange(1) when change second input`, () => {
    const input = wrapper.find(Selector.GAME_INPUT).at(1);
    input.simulate(`change`);

    expect(spyOnInputChange).toHaveBeenCalledWith(1);
  });
});
