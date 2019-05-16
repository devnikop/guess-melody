import React from 'react';
import {shallow} from 'enzyme';

import {ArtistQuestionScreen} from './artist-question-screen.jsx';

const mock = {
  song: {
    artist: `Jim Beam`,
    src: `path.mp3`,
  },
  answers: [
    {
      picture: `path.jpg`,
      artist: `John Snow`,
    },
    {
      picture: `path.jpg`,
      artist: `Jack Daniels`,
    },
    {
      picture: `path.jpg`,
      artist: `Jim Beam`,
    },
  ],
};

it(`ArtistQuestionScreen's form submit`, () => {
  const {
    song,
    answers
  } = mock;

  const formSubmit = jest.fn();
  const artistQuestionScreen = shallow(<ArtistQuestionScreen
    song={song}
    answers={answers}
    onAnswer={formSubmit}
  />);

  const submitButton = artistQuestionScreen.find(`.game__artist`);
  submitButton.simulate(`change`);

  expect(formSubmit).toHaveBeenCalledTimes(1);
});
