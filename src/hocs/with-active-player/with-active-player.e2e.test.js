import React from 'react';
import {shallow} from 'enzyme';

import withActivePlayer from './with-active-player';

const MockComponent = () => <div/>;
const MockComponentWrapped = withActivePlayer(MockComponent);

it(`WithActivePlayer's activePlayer state changed correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped/>);

  expect(wrapper.props().activePlayer).toEqual(-1);

  wrapper.props().onPlayButtonClick(2);
  expect(wrapper.props().activePlayer).toEqual(2);

  wrapper.props().onPlayButtonClick(1);
  expect(wrapper.props().activePlayer).toEqual(1);

  wrapper.props().onPlayButtonClick(1);
  expect(wrapper.props().activePlayer).toEqual(-1);
});
