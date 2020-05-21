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

it(`change on first input will call prop onChange(0)`, () => {
  const { question } = mock;
  const spyInputChange = jest.fn();

  const wrapper = shallow(
    <ArtistScreen
      question={question}
      onChange={spyInputChange}
      renderAnswer={jest.fn()}
    />
  );

  wrapper.find(Selector.ARTIST_INPUT).at(0).simulate(`change`);
  expect(spyInputChange).toHaveBeenCalledWith(0);
});
