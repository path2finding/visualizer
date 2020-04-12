import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount } from "../../setupTests";
import Menu, { MenuProps } from ".";
import { initialState } from "../../models/maze/initialState";
import {
  Menu as SemanticMenu,
  Icon as SemanticIcon,
  Dropdown as SemanticDropdown,
  Button as SemanticButton
} from "semantic-ui-react";

const mockStore = configureStore();

describe("<Menu />", () => {
  let wrapper: any;

  const props: MenuProps = {
    canMoveStart: false,
    canMoveEnd: false,
    selectedAlgo: undefined,
    algorithms: [
      { value: "A*", text: "A*" },
      { value: "Djikstras", text: "Djikstras" },
      { value: "BFS", text: "BFS" },
      { value: "DFS", text: "DFS" }
    ],
    isPlaying: false,
    maze: initialState,
    handleDropdownChange: jest.fn(),
    onStart: jest.fn(),
    onPause: jest.fn(),
    onStop: jest.fn(),
    onClear: jest.fn(),
    toggleMoveStart: jest.fn(),
    toggleMoveEnd: jest.fn(),
    saveMaze: jest.fn(),
    loadMaze: jest.fn()
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
    expect(wrapper.find(SemanticIcon)).toHaveLength(9);
  });

  it("Dropdown renders", () => {
    expect(wrapper.find(SemanticDropdown)).toBeDefined();
  });

  it("Buttons render", () => {
    expect(wrapper.find(SemanticButton)).toBeDefined();
    expect(wrapper.find(SemanticButton)).toHaveLength(8);
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

  it("Stop button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(1)
      .simulate("click");
    expect(props.onStop).toHaveBeenCalled();
  });

  it("Move Start Point button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(2)
      .simulate("click");
    expect(props.toggleMoveStart).toHaveBeenCalled();
  });

  it("Move End Point button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(3)
      .simulate("click");
    expect(props.toggleMoveEnd).toHaveBeenCalled();
  });

  it("Clear button calls action", () => {
    wrapper
      .find(SemanticButton)
      .at(4)
      .simulate("click");
    expect(props.onClear).toHaveBeenCalled();
  });

  // TODO: This fails because it's not hooked up to a reducer
  // it("Save Maze button calls action", () => {
  //   wrapper
  //     .find(SemanticButton)
  //     .at(5)
  //     .simulate("click");
  //   expect(props.saveMaze).toHaveBeenCalled();
  // });

  // it("Change dropdown selection", () => {
  //   wrapper
  //     .find(SemanticDropdown)
  //     .simulate("click")
  //     .simulate("keypress", { key: "Tab" });
  //   expect(wrapper.find(SemanticDropdown).selectedAlgo).toBeDefined();
  // });
});
