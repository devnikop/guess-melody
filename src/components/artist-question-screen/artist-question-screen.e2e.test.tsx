import * as React from 'react';
import {shallow} from 'enzyme';

import {ArtistQuestionScreen} from './artist-question-screen.jsx';

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const screen = shallow(<ArtistQuestionScreen
    onAnswer={onAnswer}
    question={question}
    renderAnswer={jest.fn()}
  />);

  const answerInputs = screen.find(`.artist__input`);
  const answerOne = answerInputs.at(0);
  const answerTwo = answerInputs.at(1);
  const answerThree = answerInputs.at(2);

  answerOne.simulate(`change`);
  answerTwo.simulate(`change`);
  answerThree.simulate(`change`);

  expect(onAnswer).toHaveBeenCalledTimes(3);

  expect(onAnswer).toHaveBeenNthCalledWith(1, {
    artist: `one`,
    picture: `pic-one`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(2, {
    artist: `two`,
    picture: `pic-two`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(3, {
    artist: `three`,
    picture: `pic-three`,
  });
});

it(`ArtistQuestionScreen's form submit`, () => {
  const {question} = mock;
  const formSubmit = jest.fn();
  const artistQuestionScreen = shallow(<ArtistQuestionScreen
    question={question}
    onAnswer={formSubmit}
    renderAnswer={jest.fn()}
  />);

  const artistInput = artistQuestionScreen.find(`.artist__input`).at(0);
  artistInput.simulate(`change`);

  expect(formSubmit).toHaveBeenCalledTimes(1);
});
