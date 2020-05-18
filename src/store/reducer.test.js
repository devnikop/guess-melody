import {rootReducer} from "./reducer";

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

const initialState = {
  currentQuestion: -1,
  mistakes: 0,
  questions: mock.questions,
};

it.skip(`should return initial state by default`, () => {
  expect(rootReducer(undefined, {})).toEqual(initialState);
});

it.skip(`should increment current step by a given number`, () => {
  expect(rootReducer(initialState, {
    type: `INCREMENT_STEP`,
    payload: 1
  })).toEqual({
    currentQuestion: 0,
    mistakes: 0,
    questions: mock.questions,
  })
});
