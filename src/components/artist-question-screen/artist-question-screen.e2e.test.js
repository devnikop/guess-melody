import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {ArtistQuestionScreen} from './artist-question-screen.jsx';

Enzyme.configure({adapter: new Adapter()});

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
