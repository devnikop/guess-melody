import React from "react";
import {shallow} from "enzyme";
import withActivePlayer from "./with-transform-props";

const MockComponent = () => <div />;
const transformFunc = (oldProps) => {
  return {
    fooz: oldProps.foo,
    baz: oldProps.bar,
  };
};
const MockComponentWrapped = withActivePlayer(transformFunc)(MockComponent);

it(`Transform props work correctly`, () => {
  const wrapper = shallow(<MockComponentWrapped
    foo={`foo`}
    bar={`bar`}
  />);

  expect(wrapper.props().foo).toEqual(undefined);
  expect(wrapper.props().bar).toEqual(undefined);

  expect(wrapper.props().fooz).toEqual(`foo`);
  expect(wrapper.props().baz).toEqual(`bar`);
});
