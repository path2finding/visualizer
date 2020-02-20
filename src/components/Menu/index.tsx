import * as React from "react";
import {
  Menu,
  DropdownProps,
  Dropdown,
  Button,
  Icon,
  DropdownItemProps,
  ButtonProps
} from "semantic-ui-react";

export interface MenuProps {
  selectedAlgo:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | undefined;
  algorithms: DropdownItemProps[];
  handleDropdownChange: (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => void;
  onStart: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  onStop?: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
}

class MenuBar extends React.Component<MenuProps, null> {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Button color="green" circular onClick={this.props.onStart}>
            <Icon name="play" style={{ margin: "auto" }} />
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="red" circular onClick={this.props.onStop}>
            <Icon name="stop" style={{ margin: "auto" }} />
          </Button>
        </Menu.Item>
        <Menu.Item style={{ marginLeft: "auto" }}>
          <Dropdown
            onChange={this.props.handleDropdownChange}
            text={(this.props.selectedAlgo as string) || "Choose an Algorithm"}
            value={this.props.selectedAlgo}
            selection
            options={this.props.algorithms}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
