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
  reducer,
};
