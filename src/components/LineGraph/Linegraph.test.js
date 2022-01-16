import React from "react";
import { render } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import LineGraph from "./LineGraph";

configure({ adapter: new Adapter() });

describe("Columns Testing", () => {
  test("renders Graph Component", () => {
    const wrapper = shallow(<LineGraph />);
    expect(wrapper.find("#chart").text()).toBe("<Chart />");
  });
});
