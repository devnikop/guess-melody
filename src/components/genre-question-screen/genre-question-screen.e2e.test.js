import React from 'react';
import {shallow} from 'enzyme';

import {GenreQuestionScreen} from './genre-question-screen.jsx';

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `pop`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

HTMLMediaElement.prototype.pause = () => {};

it(`GenreQuestionScreen's form submit`, () => {
  const {
    question
  } = mock;

  const formSubmit = jest.fn();
  const formSendPrevention = jest.fn();

  const genreQuestionScreen = shallow(<GenreQuestionScreen
    activePlayer={-1}
    question={question}
    onAnswer={formSubmit}
    onPlayButtonClick={jest.fn()}
  />);

  const formElement = genreQuestionScreen.find(`.game__tracks`);

  const inputTwo = genreQuestionScreen.find(`input`).at(1);
  inputTwo.simulate(`change`);
  formElement.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });

  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, true, false, false]);
  expect(formSubmit).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
  expect(formSubmit).toHaveBeenNthCalledWith(1, [false, true, false, false]);
});

it(`Rendered checkboxes are synchronized with state`, () => {
  const {
    question
  } = mock;

  const genreQuestionScreen = shallow(<GenreQuestionScreen
    activePlayer={-1}
    question={question}
    onAnswer={jest.fn()}
    onPlayButtonClick={jest.fn()}
  />);

  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

  const inputs = genreQuestionScreen.find(`.game__input`);
  const inputOne = inputs.at(0);
  const inputTwo = inputs.at(1);

  inputOne.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([true, false, false, false]);

  inputOne.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, false, false, false]);

  inputTwo.simulate(`change`);
  expect(genreQuestionScreen.state(`userAnswer`)).toEqual([false, true, false, false]);
});
