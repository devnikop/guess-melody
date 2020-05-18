import questions from "../mocks/questions";

const initialState = {
  currentQuestion: -1,
  mistakes: 0,
  questions,
};

const INCREMENT_MISTAKES = `INCREASE_MISTAKES`;
const INCREMENT_STEP = `NEXT_QUESTION`;
const RESET_STORE = `RESET_STORE`;

const isArtistAnswerRight = (question, index) => {
  return (question.song.artist ===
    question.answers[index].artist)
};

const ActionCreator = {
  checkArtistQuestion: (answerIndex) => {
    return function(dispatch, getState) {
      const {currentQuestion: questionIndex, mistakes, questions} = getState();
      const currentQuestion = questions[questionIndex];

      if (questionIndex >= questions.length - 1 || mistakes >= 2) {
        dispatch(ActionCreator.resetStore())
      }
      else {
        if (isArtistAnswerRight(currentQuestion, answerIndex)) {
          dispatch(ActionCreator.incrementStep())
        } else {
          dispatch(ActionCreator.incrementStep())
          dispatch(ActionCreator.incrementMistake())
        }
      }
    }
  },

  checkGenreQuestion: (answers) => {
    return function(dispatch, getState) {
      const {currentQuestion: questionIndex, mistakes, questions} = getState();

      const rightAnswerCount = answers.reduce((acc, answer, index) => {
        const currentQuestion = questions[questionIndex];
        const currentGenre = currentQuestion.answers[index].genre;
        const questionGenre = currentQuestion.genre;

        return ((questionGenre === currentGenre) === answer)
          ? acc + 1
          : acc
      }, 0);

      if (questionIndex >= questions.length - 1 || mistakes >= 2) {
        dispatch(ActionCreator.resetStore())
      } else {
        if (rightAnswerCount === answers.length) {
          dispatch(ActionCreator.incrementStep())
        } else {
          dispatch(ActionCreator.incrementStep())
          dispatch(ActionCreator.incrementMistake())
        }
      }
    }
  },

  incrementMistake: () => ({
    type: INCREMENT_MISTAKES,
    payload: 1
  }),

  incrementStep: () => ({
    type: INCREMENT_STEP,
    payload: 1
  }),

  resetStore: () => ({
    type: RESET_STORE
  })
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload
      }
    case INCREMENT_STEP:
      return {
        ...state,
        currentQuestion: state.currentQuestion + action.payload
      }
    case RESET_STORE:
      return initialState
    default:
      return state;
  }
}

export {
  ActionCreator,
  rootReducer
}
