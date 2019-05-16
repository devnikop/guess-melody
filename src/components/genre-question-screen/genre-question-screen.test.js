import React from 'react';
import renderer from 'react-test-renderer';
import {GenreQuestionScreen} from './genre-question-screen.jsx';

const answers = [
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
];

it(`GenreQuestionScreen correctly renders`, () => {
  const tree = renderer
    .create(<GenreQuestionScreen
      genre={`rock`}
      answers={answers}
      onAnswer={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
