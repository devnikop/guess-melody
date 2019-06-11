import {createAPI} from '../../api';
import MockAdapter from 'axios-mock-adapter';

import {Operation} from './data';

describe(`Reducer works correctly`, () => {
  it(`Should make a correct API call to /questions`, () => {
    const dispatch = jest.fn();
    const api = createAPI(dispatch);
    const apiMock = new MockAdapter(api);
    const questionLoader = Operation.loadQuestions();

    apiMock
      .onGet(`/questions`)
      .reply(200, [{fake: true}]);

    return questionLoader(dispatch, jest.fn(), api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
          type: `LOAD_QUESTIONS`,
          payload: [{fake: true}],
        });
      });
  });
});
