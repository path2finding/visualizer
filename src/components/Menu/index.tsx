import * as React from "react";
import { MenuState } from "../../models/menu";
import {
  Menu,
  DropdownProps,
  Dropdown,
  Button,
  Icon,
  ButtonProps,
  Modal,
  Header,
  DropdownItemProps
} from "semantic-ui-react";
import { Maze, MazeInfo } from "../../models/maze";
import { saveMaze } from "../../actions/menuActions/menuActions";

export interface MenuProps extends MenuState {
  canMoveStart: boolean;
  canMoveEnd: boolean;
  maze: Maze;
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
  toggleMoveStart: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  toggleMoveEnd: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  saveMaze: (mazeInfo: MazeInfo) => void;
}

class MenuBar extends React.Component<MenuProps, any> {
  render() {
    const {
      canMoveStart,
      canMoveEnd,
      isPlaying,
      onClear,
      onPause,
      onStart,
      onStop,
      toggleMoveEnd,
      toggleMoveStart,
      selectedAlgo,
      algorithms,
      handleDropdownChange
    } = this.props;
    const { mazeInfo } = this.props.maze;

    return (
      <Menu>
        <Menu.Item style={{ marginRight: "auto" }}>
          {!isPlaying ? (
            <Button color="green" circular onClick={onStart}>
              <Icon name="play" style={{ marginRight: "0.5rem" }} />
              <span>Play</span>
            </Button>
          ) : (
            <Button circular onClick={onPause}>
              <Icon name="pause" style={{ marginRight: "0.5rem" }} />
              <span>Pause</span>
            </Button>
          )}
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="red" circular onClick={onStop}>
            <Icon name="stop" style={{ marginRight: "0.5rem" }} />
            <span>Stop</span>
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button color="teal" circular onClick={toggleMoveStart}>
            <Icon
              name={canMoveStart ? "circle" : "circle outline"}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Move Start Point</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="purple" circular onClick={toggleMoveEnd}>
            <Icon
              name={canMoveEnd ? "circle" : "circle outline"}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Move End Point</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="orange" circular onClick={onClear}>
            <Icon name="bomb" style={{ marginRight: "0.5rem" }} />
            <span>Clear Grid</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Modal
            trigger={
              <Button color="blue" circular onClick={e => saveMaze(mazeInfo)}>
                <Icon name="save outline" style={{ marginRight: "0.5rem" }} />
                <span>Save Maze</span>
              </Button>
            }
            centered={false}
          >
            <Modal.Header>Copy this text to save your maze</Modal.Header>
            <Modal.Content>
              <Modal.Description>{JSON.stringify(mazeInfo)}</Modal.Description>
            </Modal.Content>
          </Modal>
          &nbsp; {/* Essentially just a fancy space */}
          <Dropdown
            onChange={handleDropdownChange}
            text={(selectedAlgo as string) || "Choose an Algorithm"}
            value={selectedAlgo}
            selection
            options={algorithms}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
