import MockAdapter from "axios-mock-adapter";

import { configureAPI } from "../../api";
import { ActionType, Operation } from "./data";

describe(`reducer works correctly`, () => {
  it(`should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = configureAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{ fake: true }]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionType.LOAD_QUESTIONS,
          payload: [{ fake: true }],
        })
      })
  });
});
