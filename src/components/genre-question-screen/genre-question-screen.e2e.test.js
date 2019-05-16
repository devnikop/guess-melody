import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {GenreQuestionScreen} from './genre-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

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
  const genreQuestionScreen = shallow(<GenreQuestionScreen
    genre={genre}
    answers={answers}
    onAnswer={formSubmit}
  />);

  const submitButton = genreQuestionScreen.find(`.game__tracks`);
  submitButton.simulate(`submit`, {
    preventDefault: () => {}
  });

  expect(formSubmit).toHaveBeenCalledTimes(1);
});
