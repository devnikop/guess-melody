const initialState = {
  questions: [],
};

const ACTION_TYPE = new Map([
  [`loadQuestions`, `LOAD_QUESTIONS`],
]);

const ActionCreator = {
  loadQuestions: (questions) => ({
    type: ACTION_TYPE.get(`loadQuestions`),
    payload: questions,
  }),
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) =>
    api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.get(`loadQuestions`):
      return Object.assign({}, state, {
        questions: action.payload
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
};
