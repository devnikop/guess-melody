import React from 'react';
import renderer from 'react-test-renderer';
import {ArtistQuestionScreen} from './artist-question-screen.jsx';

const song = {
  artist: `Jim Beam`,
  src: `path.mp3`,
};

const answers = [
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
];

it(`ArtistQuestionScreen correctly renders`, () => {
  const tree = renderer
    .create(<ArtistQuestionScreen
      song={song}
      answers={answers}
      onAnswer={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
