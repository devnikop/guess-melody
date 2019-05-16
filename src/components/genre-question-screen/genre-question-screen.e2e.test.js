import React from 'react';
import {mount} from 'enzyme';

import {GenreQuestionScreen} from './genre-question-screen.jsx';

const mock = {
  genre: `rock`,
  answers: [
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `rock`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `pop`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `jazz`,
    },
    {
      src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
      genre: `rock`,
    },
  ],
};

it(`GenreQuestionScreen's form submit`, () => {
  const {
    genre,
    answers
  } = mock;

  const formSubmit = jest.fn();
  const genreQuestionScreen = mount(<GenreQuestionScreen
    genre={genre}
    answers={answers}
    onAnswer={formSubmit}
  />);

  const submitButton = genreQuestionScreen.find(`.game__tracks`);
  const formSendPrevention = jest.fn();
  submitButton.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
