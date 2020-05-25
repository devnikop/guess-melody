import { getQuestions } from "../data/selectors";

const initialState = {
  currentQuestion: -1,
  errorCount: 3,
  gameTime: 5,
  mistakes: 0,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREASE_MISTAKES`,
  INCREMENT_STEP: `NEXT_QUESTION`,
  RESET_STORE: `RESET_STORE`,
};

const isArtistAnswerRight = (question, index) => {
  return (question.song.artist ===
    question.answers[index].artist)
};

const ActionCreator = {
  checkArtistQuestion: (answerIndex, currentQuestion) => {
    return function (dispatch, getState) {
      const { currentQuestion: questionIndex, mistakes } = getState().GAME;
      const questions = getQuestions(getState());

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
    return function (dispatch, getState) {
      const { currentQuestion: questionIndex, mistakes } = getState().GAME;
      const questions = getQuestions(getState());

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
    type: ActionType.INCREMENT_MISTAKES,
    payload: 1
  }),

  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP,
    payload: 1
  }),

  resetStore: () => ({
    type: ActionType.RESET_STORE
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_MISTAKES:
      return {
        ...state,
        mistakes: state.mistakes + action.payload
      }
    case ActionType.INCREMENT_STEP:
      return {
        ...state,
        currentQuestion: state.currentQuestion + action.payload
      }
    case ActionType.RESET_STORE:
      return initialState
    default:
      return state;
  }
}

export {
  ActionCreator,
  reducer,
}
