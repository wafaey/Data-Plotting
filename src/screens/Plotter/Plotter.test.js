import React from "react";
import { render } from "@testing-library/react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Plotter from "./Plotter";

configure({ adapter: new Adapter() });

describe("Plotter Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Plotter />);
  });
  test("renders LineGraph Component", () => {
    expect(wrapper.find("div").text()).toBe("<LineGraph />");
  });

  test("render DragDropContext Component", () => {
    expect(wrapper.find("#drag-drop-conatiner").text()).toBe(
      "<DragDropContext />"
    );
  });
});
