import * as React from 'react';
import * as renderer from 'react-test-renderer';

import {GenreQuestionScreen} from './genre-question-screen.jsx';

const mock = {
  userAnswer: [false, false, false, false],
  question: {
    type: `genre`,
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
