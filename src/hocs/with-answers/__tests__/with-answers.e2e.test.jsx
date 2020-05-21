import { shallow } from "enzyme";
import React from "react";

import withAnswers from "../with-answers.jsx";

const mock = {
  question: {
    answers: [
      {
        genre: `rock`,
        src: `source1`,
      },
      {
        genre: `jazz`,
        src: `source2`,
      },
    ],
    genre: `rock`,
    type: `genre`,
  },
};

describe.skip(`state answers`, () => {
  let onInputChange;
  let getAnswers;

  beforeEach(() => {
    const { question } = mock;
    const MockComponent = () => <div />;
    const MockComponentWrapped = withAnswers(MockComponent);
    const wrapper = shallow(<MockComponentWrapped
      question={question}
    />);

    onInputChange = wrapper.props().onInputChange;
    getAnswers = () => wrapper.state().answers;
  });

  it(`default value equal [false, false]`, () => {
    expect(getAnswers()).toEqual([false, false]);
  });

  it(`change to [true, false] when call onInputChange(0)`, () => {
    onInputChange(0);
    expect(getAnswers()).toEqual([true, false]);
  });

  it(`change to [false, true] && [false, false] when call onInputChange(1) twice`, () => {
    onInputChange(1);
    expect(getAnswers()).toEqual([false, true]);
    onInputChange(1);
    expect(getAnswers()).toEqual([false, false]);
  });
});
