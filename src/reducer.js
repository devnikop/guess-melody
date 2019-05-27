const initialState = {
  step: -1,
  mistakes: 0,
};

const ActionCreator = {
  incrementStep: () => ({
    type: `INCREMENT_STEP`,
    payload: 1,
  }),

  shouldReset: (questions, step) => {
    if (step + 1 >= questions.length) {
      return {
        type: `RESET`,
      };
    } else {
      return null;
    }
  },

  incrementMistake: (userAnswer, question, mistakes, maxMistakes) => {
    let answerIsCorrect = false;

    switch (question.type) {
      case `artist`:
        answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);
        break;
      case `genre`:
        answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);
        break;
    }

    if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
      return {
        type: `RESET`,
      };
    }

    return {
      type: `INCREMENT_MISTAKES`,
      payload: answerIsCorrect ? 0 : 1,
    };
  },
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
    case `INCREMENT_STEP`:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });
    case `INCREMENT_MISTAKES`:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });
    case `RESET`:
      return Object.assign({}, initialState);
  }
  return state;
};

export {
  ActionCreator,
  reducer,
  isArtistAnswerCorrect,
  isGenreAnswerCorrect
};
