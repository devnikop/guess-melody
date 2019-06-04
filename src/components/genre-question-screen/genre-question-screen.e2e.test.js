import React from 'react';
import {shallow} from 'enzyme';

import {GenreQuestionScreen} from './genre-question-screen.jsx';

const mock = {
  userAnswer: [false, false, false, false],
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
    question,
    userAnswer,
  } = mock;

  const formSubmit = jest.fn();
  const formSendPrevention = jest.fn();
  const onChangeMock = jest.fn();

  const genreQuestionScreen = shallow(<GenreQuestionScreen
    question={question}
    onAnswer={formSubmit}
    renderAnswer={jest.fn()}
    onChange={onChangeMock}
    userAnswer={userAnswer}
  />);

  const formElement = genreQuestionScreen.find(`.game__tracks`);
  const inputTwo = genreQuestionScreen.find(`input`).at(1);

  inputTwo.simulate(`change`);
  expect(onChangeMock).toHaveBeenNthCalledWith(1, 1);

  formElement.simulate(`submit`, {
    preventDefault: formSendPrevention,
  });
  expect(formSubmit).toHaveBeenCalled();
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});
