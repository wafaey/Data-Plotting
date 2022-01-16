import React from "react";
import { render } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DraggableItems from "./DraggableItems";

configure({ adapter: new Adapter() });

describe("DataBox Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<DraggableItems />);
  });
  test("render lists", () => {
    expect(wrapper.find("#draggable-list").text()).toBe("");
  });
  test("render column name", () => {
    expect(wrapper.find("#column-name"));
  });
});
