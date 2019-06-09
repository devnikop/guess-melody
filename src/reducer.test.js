import {createAPI} from './api';
import MockAdapter from 'axios-mock-adapter';

import {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  Operation,
  reducer,
} from './reducer';

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
        src: `https://upload.wikimedia.org/wikipedia/commons/1/1f/Uganda_flag_and_national_anthem_-_Oh_Uganda_Land_o.ogg`,
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
    },
  ],

  initialState: {
    isAuthorizationRequired: false,
    mistakes: 0,
    questions: [],
    step: -1,
  },
  stateForReset: {
    isAuthorizationRequired: false,
    mistakes: 3289,
    questions: [],
    step: 10000,
  },
  incrementedStep: {
    isAuthorizationRequired: false,
    mistakes: 0,
    questions: [],
    step: 0,
  },
  gameOverTrueState: {
    isAuthorizationRequired: false,
    mistakes: 0,
    questions: [],
    step: -1,
  },
  incrementedMistakes: {
    isAuthorizationRequired: false,
    mistakes: 1,
    questions: [],
    step: -1,
  },
};

describe(`Action creator work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    });
  });

  it(`Action creator for shouldReset returns correct action`, () => {
    expect(ActionCreator.restart()).toEqual({
      type: `RESET`,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for artist is correct`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `correct`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `correct`,
        },
        {
          picture: ``,
          artist: `incorrect`,
        },
        {
          picture: ``,
          artist: `incorrect-2`,
        },
      ],
    })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for artist is incorrect`, () => {
    expect(ActionCreator.incrementMistake({
      artist: `incorrect`,
      picture: ``,
    }, {
      type: `artist`,
      song: {
        artist: `correct`,
        src: ``,
      },
      answers: [
        {
          picture: ``,
          artist: `correct`,
        },
        {
          picture: ``,
          artist: `incorrect`,
        },
        {
          picture: ``,
          artist: `incorrect-2`,
        },
      ],
    })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });

  it(`Action creator for incrementing mistake returns action with 0 payload if answer for genre is correct`, () => {
    expect(ActionCreator.incrementMistake(
        [false, true, false, true], {
          type: `genre`,
          genre: `correct`,
          answers: [
            {
              src: ``,
              genre: `incorrect`,
            },
            {
              src: ``,
              genre: `correct`,
            },
            {
              src: ``,
              genre: `incorrect`,
            },
            {
              src: ``,
              genre: `correct`,
            },
          ],
        })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 0,
    });
  });

  it(`Action creator for incrementing mistake returns action with 1 payload if answer for genre is incorrect`, () => {
    expect(ActionCreator.incrementMistake(
        [true, true, true, true], {
          type: `genre`,
          genre: `correct`,
          answers: [
            {
              src: ``,
              genre: `incorrect`,
            },
            {
              src: ``,
              genre: `correct`,
            },
            {
              src: ``,
              genre: `incorrect`,
            },
            {
              src: ``,
              genre: `correct`,
            },
          ],
        })).toEqual({
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    });
  });
});

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      artist: `correct-artist`,
      picture: `correct-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ],
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      artist: `incorrect-artist-2`,
      picture: `incorrect-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ],
    })).toBe(false);
  });

  it(`Genre answer is checked correctly`, () => {
    expect(isGenreAnswerCorrect([false, false, true, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `pop`,
          src: `0`,
        },
        {
          genre: `pop`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `pop`,
          src: `3`,
        },
      ],
    })).toEqual(true);

    expect(isGenreAnswerCorrect([false, false, false, false], {
      type: `genre`,
      genre: `rock`,
      answers: [
        {
          genre: `pop`,
          src: `0`,
        },
        {
          genre: `pop`,
          src: `1`,
        },
        {
          genre: `rock`,
          src: `2`,
        },
        {
          genre: `pop`,
          src: `3`,
        },
      ],
    })).toEqual(false);
  });
});

describe(`Reducer works correctly`, () => {
  it(`Should return initial state by default`, () => {
    const {initialState} = mock;

    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it(`Should increment step by a given number`, () => {
    const {initialState, incrementedStep} = mock;
    const action = {
      type: `INCREMENT_STEP`,
      payload: 1,
    };

    expect(reducer(initialState, action)).toEqual(incrementedStep);
  });

  it(`Should increment mistakes by a given number`, () => {
    const {initialState, incrementedMistakes} = mock;
    const action = {
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    };

    expect(reducer(initialState, action)).toEqual(incrementedMistakes);
  });

  it(`Should correctly reset application state`, () => {
    const {initialState, stateForReset} = mock;

    expect(reducer(stateForReset, {type: `RESET`})).toEqual(initialState);
  });

  it(`Should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}],
        });
      });
  });
});


