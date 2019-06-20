import * as React from 'react';
import * as renderer from 'react-test-renderer';

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

it(`GenreQuestionScreen correctly renders`, () => {
  const {
    question,
    userAnswer
  } = mock;

  const tree = renderer
    .create(<GenreQuestionScreen
      question={question}
      onAnswer={jest.fn()}
      renderAnswer={jest.fn()}
      onChange={jest.fn()}
      userAnswer={userAnswer}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
