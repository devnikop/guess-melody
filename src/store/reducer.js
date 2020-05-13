const initialState = {
  mistakes: 0,
  step: -1,
};

const INCREMENT_MISTAKES = `INCREASE_MISTAKES`;
const INCREMENT_STEP = `NEXT_QUESTION`;

const ActionCreator = {
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
      return {...state, mistakes: state.mistakes + action.payload}
    case INCREMENT_STEP:
      return {...state, step: state.step + action.payload}
    default:
      return state;
  }
}

export {
  ActionCreator,
  rootReducer
}
