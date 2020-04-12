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
  Form,
  TextAreaProps,
  Message,
  Input,
} from "semantic-ui-react";
import { MazeInfo, Maze } from "../../models/maze";
import { getMazeSize } from "../Maze/Maze";

import "./Menu.scss";

export interface MenuProps extends MenuState {
  canMoveStart: boolean;
  canMoveEnd: boolean;
  maze: Maze;
  handleDropdownChange: (
    _: React.SyntheticEvent<HTMLElement, Event>,
    { value }: DropdownProps
  ) => void;
  handleDropdownSpeed: (
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
  saveMaze: (maze: MazeInfo) => void;
  loadMaze: (maze: MazeInfo) => void;
  toggleMoveStart: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  toggleMoveEnd: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  updateGridSize: (cols: number, rows: number) => void;
  randomizeWalls: () => void;
}

export interface _MenuState {
  value: string;
  showModal: boolean;
  jsonError: boolean;
  mazeCols: number;
  mazeRows: number;
}

class MenuBar extends React.Component<MenuProps, _MenuState> {
  state = {
    value: "",
    showModal: false,
    jsonError: false,
    mazeCols: getMazeSize(this.props.maze.mazeInfo).x,
    mazeRows: getMazeSize(this.props.maze.mazeInfo).y,
  };

  //event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void
  handleChange = (
    event: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ): void => {
    try {
      var json = JSON.parse(data.value as string);
      this.setState({
        ...this.state,
        jsonError: false,
        value: data.value as string,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        jsonError: true,
        value: data.value as string,
      });
    }
  };

  handleSubmit = () => {
    try {
      const maze: MazeInfo = JSON.parse(this.state.value);
      this.props.loadMaze(maze);
      this.setState({ value: "", showModal: false });
    } catch (err) {
      console.error(err);
    }
  };

  handleClick = () => {
    this.setState({ ...this.state, showModal: true });
  };

  render() {
    const {
      canMoveStart,
      canMoveEnd,
      maze,
      isPlaying,
      onClear,
      onPause,
      onStart,
      onStop,
      saveMaze,
      toggleMoveEnd,
      toggleMoveStart,
      selectedAlgo,
      algorithms,
      handleDropdownChange,
      randomizeWalls,
      speed,
      currentSpeed,
      handleDropdownSpeed,
      updateGridSize,
    } = this.props;
    const { mazeCols, mazeRows } = this.state;

    return (
      <Menu borderless>
        <Menu.Item>
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

        <Menu.Item style={{ marginRight: "auto" }}>
          <Dropdown
            className="speed-dropdown"
            disabled={isPlaying}
            onChange={handleDropdownSpeed}
            text={"Playback speed x" + currentSpeed || "Change Speed"}
            value={currentSpeed}
            selection
            options={speed}
            fluid={true}
          />
          &nbsp; {/* Essentially just a fancy space */}
          <div className="grid-size-inputs">
            <Input
              size="small"
              type="number"
              label="Cols"
              fluid={true}
              value={mazeCols}
              onChange={(e) => this.setState({ mazeCols: +e.target.value })}
              onBlur={() =>
                mazeCols < 20 ? this.setState({ mazeCols: 20 }) : null
              }
            />
            &nbsp; {/* Essentially just a fancy space */}
            <Input
              size="small"
              type="number"
              label="Rows"
              fluid={true}
              value={mazeRows}
              onChange={(e) => this.setState({ mazeRows: +e.target.value })}
              onBlur={() =>
                mazeRows < 20 ? this.setState({ mazeRows: 20 }) : null
              }
            />
          </div>
          &nbsp; {/* Essentially just a fancy space */}
          <Button
            color="yellow"
            circular
            onClick={() => updateGridSize(mazeCols, mazeRows)}
          >
            <span>Update Size</span>
          </Button>
          <Dropdown
            disabled={isPlaying}
            onChange={handleDropdownChange}
            text={(selectedAlgo as string) || "Choose an Algorithm"}
            value={selectedAlgo}
            selection
            options={algorithms}
          />
        </Menu.Item>

        <Menu.Item>
          <Button
            color="teal"
            circular
            onClick={toggleMoveStart}
            disabled={isPlaying}
          >
            <Icon
              name={canMoveStart ? "circle" : "circle outline"}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Move Start Point</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Button
            color="purple"
            circular
            onClick={toggleMoveEnd}
            disabled={isPlaying}
          >
            <Icon
              name={canMoveEnd ? "circle" : "circle outline"}
              style={{ marginRight: "0.5rem" }}
            />
            <span>Move End Point</span>
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button
            color="orange"
            circular
            onClick={randomizeWalls}
            disabled={isPlaying}
          >
            <Icon name="table" style={{ marginRight: "0.5rem" }} />
            <span>Randomize Walls</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
          <Button
            color="orange"
            circular
            onClick={onClear}
            disabled={isPlaying}
          >
            <Icon name="bomb" style={{ marginRight: "0.5rem" }} />
            <span>Clear Grid</span>
          </Button>
          &nbsp; {/* Essentially just a fancy space */}
        </Menu.Item>
        <Menu.Item>
          <Modal
            trigger={
              <Button
                color="blue"
                circular
                onClick={() => saveMaze(maze.mazeInfo)}
                disabled={isPlaying}
              >
                <Icon name="save outline" style={{ marginRight: "0.5rem" }} />
                <span>Save Maze</span>
              </Button>
            }
            centered={false}
          >
            <Modal.Header>Copy this text to save your maze</Modal.Header>
            <Modal.Content>
              <button
                style={{ marginBottom: "10px" }}
                onClick={() =>
                  navigator.clipboard.writeText(JSON.stringify(maze.mazeInfo))
                }
              >
                <Icon name="copy outline" style={{ marginRight: "0.5rem" }} />
                Copy
              </button>
              <Modal.Description>
                {JSON.stringify(maze.mazeInfo)}
              </Modal.Description>
            </Modal.Content>
          </Modal>
          &nbsp; {/* Essentially just a fancy space */}
          <Button
            color="blue"
            circular
            onClick={this.handleClick.bind(this)}
            disabled={isPlaying}
          >
            <Icon name="upload" style={{ marginRight: "0.5rem" }} />
            <span>Load Maze</span>
          </Button>
          <Modal centered={false} open={this.state.showModal}>
            <Modal.Header>Paste your maze in the text box</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {/* Trying to hook up this textarea to capture maze info
                    inspration, https://react.semantic-ui.com/collections/form/#usage-capture-values */}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <label>Maze Text</label>
                  <Form.TextArea
                    style={{ minHeight: 500, minWidth: 800 }}
                    placeholder="Maze Text"
                    name="name"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                  />
                  <Message visible={this.state.jsonError}>
                    Enter properly formatted json
                  </Message>
                  <Form.Button content="Submit" />
                </Form>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
