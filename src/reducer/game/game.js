const initialState = {
  mistakes: 0,
  step: -1,
};

const ACTION_TYPE = new Map([
  [`incrementMistake`, `INCREMENT_MISTAKES`],
  [`incrementStep`, `INCREMENT_STEP`],
  [`reset`, `RESET`],
]);

const ActionCreator = {
  incrementStep: () => ({
    type: ACTION_TYPE.get(`incrementStep`),
    payload: 1,
  }),

  incrementMistake: (userAnswer, question) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    return {
      type: ACTION_TYPE.get(`incrementMistake`),
      payload: answerIsCorrect ? 0 : 1,
    };
  },

  restart: () => ({
    type: ACTION_TYPE.get(`reset`),
  }),
};

const isArtistAnswerCorrect = (userAnswer, question) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (userAnswer, question) => {
  return userAnswer.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.get(`incrementStep`):
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case ACTION_TYPE.get(`incrementMistake`):
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ACTION_TYPE.get(`reset`):
      return Object.assign({}, initialState);
  }
  return state;
};

export {
  ActionCreator,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  reducer,
};
