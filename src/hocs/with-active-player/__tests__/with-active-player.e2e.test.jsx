import { shallow } from "enzyme";
import React from "react";

import withActivePlayer from "../with-active-player.jsx";

describe(`state activePlayer`, () => {
  let onPlayButtonClick;
  let getActivePlayer;

  beforeEach(() => {
    const MockComponent = () => <div />;
    const MockComponentWrapped = withActivePlayer(MockComponent);
    const wrapper = shallow(<MockComponentWrapped />);

    onPlayButtonClick = wrapper.props().onPlayButtonClick;
    getActivePlayer = () => wrapper.state().activePlayer;
  });

  it(`default value equal -1`, () => {
    expect(getActivePlayer()).toEqual(-1);
  });
});
