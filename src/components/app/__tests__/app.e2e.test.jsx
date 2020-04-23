import React from "react";
import { mount } from "enzyme";

import App from "../app.jsx";

const mock = {
  questions: [
    {
      answers: [
        {
          genre: `rock`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `pop`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `jazz`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
        {
          genre: `rock`,
          src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
        },
      ],
      genre: `rock`,
      type: `genre`,
    },
    {
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
      song: {
        artist: `Jim Beam`,
        src: `path.mp3`,
      },
      type: `artist`,
    },
  ],
};

describe(`question state change through the game`, () => {
  it(`Welcome screen click change state`, () => {
    const { questions } = mock;
    const component = mount(
      <App errorCount={5} gameTime={3} questions={questions} />
    );

    const welcomeScreenButton = component.find(`.welcome__button`);

    expect(component.state(`question`)).toEqual(-1);
    welcomeScreenButton.simulate(`click`);
    component.update();
    expect(component.state(`question`)).toEqual(0);
  });

  it(`Genre screen sumbit change state`, () => {
    const { questions } = mock;
    const component = mount(
      <App errorCount={5} gameTime={3} questions={questions} />
    );

    component.setState({
      question: 0,
    });
    component.update();

    const form = component.find(`.game__tracks`);
    form.simulate(`submit`, {
      preventDefault: jest.fn(),
    });
    component.update();

    expect(component.state(`question`)).toEqual(1);
  });

  it(`Last question answer leads to the first screen`, () => {
    const { questions } = mock;
    const component = mount(
      <App errorCount={5} gameTime={3} questions={questions} />
    );

    component.setState({
      question: questions.length - 1,
    });
    component.update();

    const form = component.find(`.game__artist`);
    form.simulate(`change`);
    component.update();

    expect(component.state(`question`)).toEqual(-1);
  });
});
