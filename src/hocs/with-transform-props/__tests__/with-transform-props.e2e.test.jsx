import { shallow } from "enzyme";
import React from "react";

import withTransformProps from "../with-transform-props.jsx";

it(`should change props`, () => {
  const MockComponent = () => <div />;
  const transformFunc = (oldProps) => ({
    fooz: oldProps.foo,
    baz: oldProps.bar,
  });
  const MockComponentWrapped = withTransformProps(transformFunc)(MockComponent);

  const wrapper = shallow(<MockComponentWrapped
    foo={`foo`}
    bar={`bar`}
  />);

  expect(wrapper.props().foo).toEqual(undefined);
  expect(wrapper.props().bar).toEqual(undefined);

  expect(wrapper.props().fooz).toEqual(`foo`);
  expect(wrapper.props().baz).toEqual(`bar`);
});
