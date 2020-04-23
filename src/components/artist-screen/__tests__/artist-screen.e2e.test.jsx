import { shallow } from "enzyme";
import React from "react";

import ArtistScreen from "../artist-screen.jsx";

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
  const changeHandler = jest.fn();

  const component = shallow(
    <ArtistScreen onAnswer={changeHandler} question={question} />
  );

  const form = component.find(`.game__artist`);
  form.simulate(`change`);
});
