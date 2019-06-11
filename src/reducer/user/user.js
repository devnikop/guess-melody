const initialState = {
  isAuthorizationRequired: false,
};

const ACTION_TYPE = new Map([
  [`requiredAuthorization`, `REQUIRED_AUTHORIZATION`],
]);

const ActionCreator = {
  requiredAuthorization: (status) => ({
    type: ACTION_TYPE.get(`requiredAuthorization`),
    payload: status,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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
