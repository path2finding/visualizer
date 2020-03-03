import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount } from "../../setupTests";
import Menu, { MenuProps } from ".";
import {
  Menu as SemanticMenu,
  Icon as SemanticIcon,
  Dropdown as SemanticDropdown,
  Button as SemanticButton
} from "semantic-ui-react";

const mockStore = configureStore();
// const mockDispatchfn = jest.fn(() => new Promise(resolve => resolve('')));
const mockDispatchfn = jest.fn();

describe("<Menu />", () => {
  let wrapper: any;

  const props: MenuProps = {
    selectedAlgo: undefined,
    algorithms: [
      { value: "A*", text: "A*" },
      { value: "Djikstras", text: "Djikstras" },
      { value: "BFS", text: "BFS" },
      { value: "DFS", text: "DFS" }
    ],
    isPlaying: false,
    handleDropdownChange: jest.fn(),
    onStart: jest.fn(),
    onPause: jest.fn(),
    onStop: jest.fn(),
    onClear: jest.fn()
  };

  it("defines the component", () => {
    wrapper = mount(
      <Provider store={mockStore()}>
        <Menu {...props} />
      </Provider>
    );
    // console.log('wrapper is', wrapper.debug());
    expect(wrapper).toBeDefined();
  });

  it("Menu renders with icons", () => {
    expect(wrapper.find(SemanticMenu)).toBeDefined();
    expect(wrapper.find(SemanticMenu.Item)).toBeDefined();
    expect(wrapper.find(SemanticMenu.Item)).toHaveLength(2);
    expect(wrapper.find(SemanticIcon)).toBeDefined();
    expect(wrapper.find(SemanticIcon)).toHaveLength(4);
  });

  it("Dropdown renders", () => {
    expect(wrapper.find(SemanticDropdown)).toBeDefined();
  });

  it("Buttons render", () => {
    expect(wrapper.find(SemanticButton)).toBeDefined();
    expect(wrapper.find(SemanticButton)).toHaveLength(3);
  });

  it("Play button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(0)
      .simulate("click");
    expect(props.onStart).toHaveBeenCalled();
  });

  it("Pause button calls action", () => {
    let newProps = props;
    newProps.isPlaying = true;
    let newWrapper = mount(
      <Provider store={mockStore()}>
        <Menu {...newProps} />
      </Provider>
    );
    newWrapper
      .find(SemanticButton)
      .at(0)
      .simulate("click");
    expect(props.onPause).toHaveBeenCalled();
  });

  it("Strop button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(1)
      .simulate("click");
    expect(props.onStop).toHaveBeenCalled();
  });

  it("Clear button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(2)
      .simulate("click");
    expect(props.onClear).toHaveBeenCalled();
  });

  // it("Change dropdown selection", () => {
  //   wrapper
  //     .find(SemanticDropdown)
  //     .simulate("click")
  //     .simulate("keypress", { key: "Tab" });
  //   expect(wrapper.find(SemanticDropdown).selectedAlgo).toBeDefined();
  // });
});
