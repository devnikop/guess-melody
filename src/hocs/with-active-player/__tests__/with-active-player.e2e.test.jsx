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

  it(`change to 0 when call onPlayButtonClick(0)`, () => {
    onPlayButtonClick(0);
    expect(getActivePlayer()).toEqual(0);
  });

  it(`change to 1 && -1 accordingly when call onPlayButtonClick(1) twice`, () => {
    onPlayButtonClick(1);
    expect(getActivePlayer()).toEqual(1);

    onPlayButtonClick(1);
    expect(getActivePlayer()).toEqual(-1);
  });
});
