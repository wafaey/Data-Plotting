import React from "react";
import { render } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DataBox from "./DataBox";

configure({ adapter: new Adapter() });

describe("DataBox Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DataBox />);
  });
  test("render Titles", () => {
    expect(wrapper.find("#title").text()).toBe("");
  });
  test("render Buttons", () => {
    expect(wrapper.find("#button").text()).toBe("Clear");
  });
});
