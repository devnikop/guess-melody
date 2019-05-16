import React from 'react';
import {mount} from 'enzyme';

import {App} from './app.jsx';

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `rock`,
      answers: [
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
      ],
    },
    {
      type: `artist`,
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
    }
  ]
};

it(`On click on WelcomeScreen App swithes to the first question`, () => {
  const {questions} = mock;
  const app = mount(<App
    errorCount={0}
    gameTime={0}
    questions={questions}
  />);

  expect(app.state(`question`)).toEqual(-1);

  const button = app.find(`button`);
  button.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);
});

it(`Question answer swithes to another question`, () => {
  const {questions} = mock;
  const app = mount(<App
    errorCount={0}
    gameTime={0}
    questions={questions}
  />);

  app.setState({
    question: 0,
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`submit`, {
    preventDefault() {},
  });

  expect(app.state(`question`)).toEqual(1);
});

it(`Last question answer leads to the first screen`, () => {
  const {questions} = mock;
  const app = mount(<App
    errorCount={0}
    gameTime={0}
    questions={questions}
  />);

  app.setState({
    question: 1,
  });
  app.update();

  const form = app.find(`form`);
  form.simulate(`change`);

  expect(app.state(`question`)).toEqual(-1);
});
