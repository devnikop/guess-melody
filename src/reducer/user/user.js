const initialState = {
  isAuthorizationRequired: true,
  user: {},
};

const ACTION_TYPE = new Map([
  [`requiredAuthorization`, `REQUIRED_AUTHORIZATION`],
  [`login`, `LOGIN`],
]);

const ActionCreator = {
  login: (user) => {
    return {
      type: ACTION_TYPE.get(`login`),
      payload: user,
    };
  },

  requiredAuthorization: (status) => ({
    type: ACTION_TYPE.get(`requiredAuthorization`),
    payload: status,
  }),
};

const Operation = {
  checkAuth: () => {
    return (dispatch, _getState, api) => {
      return api
        .get(`/login`)
        .then((response) => {
          if (response.status === 200) {
            dispatch(ActionCreator.requiredAuthorization(true));
          }
        });
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPE.get(`login`):
      return Object.assign({}, state, {
        user: action.payload
      });

    case ACTION_TYPE.get(`requiredAuthorization`):
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });
  }
  return state;
};

export {
  ActionCreator,
  Operation,
  reducer,
};
