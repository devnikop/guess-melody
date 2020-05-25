const initialState = {
  email: ``,
  isAuthorizationRequired: false,
  password: ``,
  token: {
    email: ``,
    id: -1,
    name: ``,
  }
};

const ActionType = {
  ADD_TOKEN: `ADD_TOKEN`,
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  addToken: (token) => ({
    type: ActionType.ADD_TOKEN,
    payload: token,
  }),

  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
};

const Operation = {
  tryAuthorization: (email, password) => async (dispatch, _getState, api) => {
    const response = await api.post(`/login`, { email, password, });
    dispatch(ActionCreator.addToken(response.data))
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case ActionType.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        isAuthorizationRequired: action.payload
      };
    default:
      return state;
  }
}

export {
  ActionCreator,
  ActionType,
  Operation,
  reducer,
}
