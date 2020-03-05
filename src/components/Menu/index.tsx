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
  isPlaying: boolean;
  handleDropdownChange: (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => void;
  onStart: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  onPause: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  onStop: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  onClear: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
}

class MenuBar extends React.Component<MenuProps, any> {
  render() {
    return (
      <Menu>
        <Menu.Item style={{ marginRight: "auto" }}>
          {!this.props.isPlaying ? (
            <Button color="green" circular onClick={this.props.onStart}>
              <Icon name="play" style={{ marginRight: "0.5rem" }} />
              <span>Play</span>
            </Button>
          ) : (
            <Button circular onClick={this.props.onPause}>
              <Icon name="pause" style={{ marginRight: "0.5rem" }} />
              <span>Pause</span>
            </Button>
          )}
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="red" circular onClick={this.props.onStop}>
            <Icon name="stop" style={{ marginRight: "0.5rem" }} />
            <span>Stop</span>
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button color="orange" circular onClick={this.props.onClear}>
            <Icon name="bomb" style={{ marginRight: "0.5rem" }} />
            <span>Clear Grid</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
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
