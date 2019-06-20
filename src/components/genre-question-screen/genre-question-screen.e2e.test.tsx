import * as React from 'react';
import {shallow} from 'enzyme';

import {GenreQuestionScreen} from './genre-question-screen';
import {
  GenreType,
  Type,
} from '../../types';

const mock = {
  userAnswer: [false, false, false, false],
  question: {
    type: Type.GENRE,
    genre: GenreType.ROCK,
    answers: [
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: GenreType.ROCK,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: GenreType.POP,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: GenreType.JAZZ,
      },
      {
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        genre: GenreType.ROCK,
      },
    ],
  }
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
