import {reducer} from './user';

const mock = {
  initialState: {
    isAuthorizationRequired: false,
    mistakes: 0,
    questions: [],
    step: -1,
  },
  authorizationChangedState: {
    isAuthorizationRequired: true,
    mistakes: 0,
    questions: [],
    step: -1,
  }
};

describe(`Reducer works correctly`, () => {
  it(`Should change isAuthorizationRequired by given payload`, () => {
    const {
      initialState,
      authorizationChangedState
    } = mock;

    const action = {
      type: `REQUIRED_AUTHORIZATION`,
      payload: true,
    };

    expect(reducer(initialState, action)).toEqual(authorizationChangedState);

  });
});
