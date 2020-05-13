const initialState = {
  mistakes: 0,
  currentQuestion: -1,
};

const INCREMENT_MISTAKES = `INCREASE_MISTAKES`;
const INCREMENT_STEP = `NEXT_QUESTION`;
const CHECK_ANSWER = `CHECK_ANSWER`;

const ActionCreator = {
  checkAnswer: (answers) => {


    return {
      type: CHECK_ANSWER
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
    default:
      return state;
  }
}

export {
  ActionCreator,
  rootReducer
}
