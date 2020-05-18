import { shallow } from "enzyme";
import React from "react";

import { ArtistScreen } from "../artist-screen.jsx";

const Selector = {
  ARTIST_INPUT: `.artist__input`,
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
  const spyInputChange = jest.fn();

  const wrapper = shallow(
    <ArtistScreen onChange={spyInputChange} question={question} />
  );

  wrapper.find(Selector.ARTIST_INPUT).at(0).simulate(`change`);
  expect(spyInputChange).toHaveBeenCalled();
});
