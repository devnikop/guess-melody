import React from 'react';
import {shallow} from 'enzyme';

import withUserAnswer from './with-user-answer';

const MockComponent = () => <div/>;
const MockComponentWrapped = withUserAnswer(MockComponent);

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `pop`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `rock`,
      },
    ],
  },
};

it(`WithUserAnswer's userAnswer state changed correctly`, () => {
  const {question} = mock;

  const wrapper = shallow(<MockComponentWrapped
    question={question}
  />);

  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().onChange(0);
  expect(wrapper.props().userAnswer).toEqual([true, false, false, false]);

  wrapper.props().onChange(0);
  expect(wrapper.props().userAnswer).toEqual([false, false, false, false]);

  wrapper.props().onChange(1);
  expect(wrapper.props().userAnswer).toEqual([false, true, false, false]);
});
