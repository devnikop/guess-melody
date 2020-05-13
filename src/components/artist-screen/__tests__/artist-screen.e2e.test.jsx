import { shallow } from "enzyme";
import React from "react";

import { ArtistScreen } from "../artist-screen.jsx";

const Selector = {
  GAME_ARTIST: `.game__artist`,
}

const mock = {
  question: {
    answers: [
      {
        picture: `source`,
        artist: `John`,
      },
      {
        picture: `source2`,
        artist: `Jim`,
      },
    ],
    song: {
      artist: `artist`,
      src: `source`,
    },
    type: `artist`,
  },
};

it(`form change`, () => {
  const { question } = mock;
  const spyFormChange = jest.fn();

  const wrapper = shallow(
    <ArtistScreen onAnswer={spyFormChange} question={question} />
  );

  wrapper.find(Selector.GAME_ARTIST).simulate(`change`);
  expect(spyFormChange).toHaveBeenCalled();
});
