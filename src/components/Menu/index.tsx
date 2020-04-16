import * as React from "react";
import Moment from "react-moment";
import { MenuState } from "../../models/menu";
import ReactMarkdown from "react-markdown";
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
  Sidebar,
  Segment,
  Message,
  Input,
  Label,
} from "semantic-ui-react";
import { MazeInfo, Space } from "../../models/maze";
import * as yup from "yup";
import { Maze } from "../../models/maze";
import { SpaceTypes } from "../Space/types";
import { Algorithms } from "../Maze/algorithms/types";
import algos from "../../algos";
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
  loadMaze: (maze: MazeInfo) => void;
  toggleMoveStart: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  toggleMoveEnd: (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => void;
  handleChangeGridSize: (cols: number, rows: number) => void;
  randomizeWalls: () => void;
}

export interface _MenuState {
  pastedMaze: string | number | undefined;
  showModal: boolean;
  hasError: boolean;
  errorMessage: string;
  sidebarOpen: boolean;
  mazeCols: number;
  mazeRows: number;
}

export const yupSpaceSchema = yup.object({
  type: yup
    .mixed()
    .oneOf([
      SpaceTypes.wall,
      SpaceTypes.empty,
      SpaceTypes.start,
      SpaceTypes.end,
    ])
    .required(),
  visited: yup.bool().required(),
  path: yup.bool().required(),
});

class MenuBar extends React.Component<MenuProps, _MenuState> {
  state = {
    pastedMaze: "",
    showModal: false,
    hasError: false,
    errorMessage: "",
    sidebarOpen: false,
    mazeCols: getMazeSize(this.props.maze.mazeInfo).x,
    mazeRows: getMazeSize(this.props.maze.mazeInfo).y,
  };

  checkDynamicKeys = (keys: any[]): boolean => {
    for (let i = 0; i < keys.length; i++) {
      const keyIsValid = yup.number().required().isValidSync(keys[i]);
      if (!keyIsValid) {
        return false;
      }
    }
    return true;
  };

  checkSpace = (keys: any[], obj: any): boolean => {
    for (let i = 0; i < keys.length; i++) {
      const isArray = yup.array().isValidSync(obj[i]);
      if (!isArray) return false;
      if (obj[i].length === 0) return false;
      for (let j = 0; j < obj[i].length; j++) {
        console.log(obj[keys[i]][j]);
        const spaceIsValid = yupSpaceSchema.isValidSync(obj[keys[i]][j]);
        if (!spaceIsValid) {
          return false;
        }
      }
    }
    return true;
  };

  checkStartEndPoints = (maze: MazeInfo): boolean => {
    let numStart: number = 0;
    let numEnd: number = 0;
    // eslint-disable-next-line array-callback-return
    Object.keys(maze).map((key: string) => {
      // eslint-disable-next-line array-callback-return
      maze[+key].map((value: Space) => {
        numStart += value.type === SpaceTypes.start ? 1 : 0;
        numEnd += value.type === SpaceTypes.end ? 1 : 0;
      });
    });
    return numStart <= 1 && numEnd <= 1;
  };

  //event: React.FormEvent<HTMLTextAreaElement>, data: TextAreaProps) => void
  isValidMaze = (mazeInfo: MazeInfo): boolean => {
    console.log("validate");
    // try {
    // const maze: MazeInfo = JSON.parse(data.value as string);
    // console.log(maze);
    const keys = Object.keys(mazeInfo);

    if (keys.length === 0) {
      this.setState({
        errorMessage: "Object should have keys!",
      });
      return false;
    } else {
      const keysAreValid = this.checkDynamicKeys(keys);

      if (!keysAreValid) {
        this.setState({
          errorMessage: "Object keys must be numeric!",
        });
        return false;
      } else {
        const spacesAreValid = this.checkSpace(keys, mazeInfo);

        if (!spacesAreValid) {
          this.setState({
            errorMessage: "Spaces required parameters type, visited, and path!",
          });
          return false;
        } else {
          const startEndPointsValid = this.checkStartEndPoints(mazeInfo);

          if (!startEndPointsValid) {
            this.setState({
              errorMessage:
                "Maze can only have one start point and one end point",
            });
            return false;
          }
          //  else {
          //   this.setState({
          //     hasError: false,
          //     pastedMaze: data.value as string,
          //   });
          // }
        }
      }
    }
    // } catch (e) {
    // this.setState({
    //   ...this.state,
    //   hasError: true,
    //   errorMessage: "Maze data must be in JSON format!",
    // });
    // }
    return true;
  };

  loadMaze = () => {
    // TODO: move validation here
    const { pastedMaze } = this.state;
    console.log("Submit", pastedMaze);

    try {
      const mazeInfo: MazeInfo = JSON.parse(pastedMaze);

      if (this.isValidMaze(mazeInfo)) {
        // Maze is valid
        console.log("valid");
        // this.props.loadMaze(mazeInfo);
        // this.setState({ pastedMaze: "", showModal: false });
      } else {
        console.log("invalid");
      }
    } catch (err) {
      console.error(err);
    }
  };

  getInfo = () => {
    let al = this.props.selectedAlgo;
    if (al === null) {
      al = "Select an algorithm";
    } else if (al === Algorithms.astar) {
      al = algos.a;
    } else if (al === Algorithms.bfs) {
      al = algos.BFS;
    } else if (al === Algorithms.dfs) {
      al = algos.DFS;
    } else if (al === Algorithms.djikstras) {
      al = algos.Djikstras;
    }
    return al as string;
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
      toggleMoveEnd,
      toggleMoveStart,
      selectedAlgo,
      algorithms,
      handleDropdownChange,
      randomizeWalls,
      playSpeeds,
      currentSpeed,
      handleDropdownSpeed,
      handleChangeGridSize,
      startTime,
      endTime,
    } = this.props;
    const { mazeCols, mazeRows, pastedMaze, sidebarOpen } = this.state;

    return (
      <div>
        <Menu borderless style={{ marginBottom: 0 }}>
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
            {/* TODO: fix */}
            {isPlaying && startTime && !endTime ? (
              <Menu.Item>
                <Moment date={startTime} durationFromNow></Moment>
              </Menu.Item>
            ) : startTime && endTime ? (
              <Menu.Item>
                <Moment date={startTime} duration={endTime}></Moment>
              </Menu.Item>
            ) : (
              ""
            )}
          </Menu.Item>

          <Menu.Item style={{ marginRight: "auto" }}>
            <Dropdown
              disabled={isPlaying}
              onChange={handleDropdownSpeed}
              text={`Playback speed x${currentSpeed}` || "Change Speed"}
              value={currentSpeed}
              selection
              options={playSpeeds}
            />
            &nbsp; {/* Essentially just a fancy space */}
            <Dropdown
              disabled={isPlaying}
              onChange={handleDropdownChange}
              text={selectedAlgo || "Choose an Algorithm"}
              value={selectedAlgo}
              selection
              options={algorithms}
            />
          </Menu.Item>

          <Menu.Item>
            <Dropdown
              className="grid-size-dropdown"
              button
              disabled={isPlaying}
              text="Change Grid Size"
              fluid={true}
              color="pink"
            >
              <Dropdown.Menu>
                <Input
                  onClick={(e: any) => e.stopPropagation()}
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
                <Input
                  onClick={(e: any) => e.stopPropagation()}
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
                <Button
                  color="yellow"
                  circular
                  onClick={() => handleChangeGridSize(mazeCols, mazeRows)}
                >
                  <span>Update Size</span>
                </Button>
              </Dropdown.Menu>
            </Dropdown>
            &nbsp; {/* Essentially just a fancy space */}
            <div className="row1">
              <Button
                color="purple"
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
              &nbsp;
              <Button
                color="teal"
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
            </div>
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
              className="save-modal"
              trigger={
                <Button color="blue" circular disabled={isPlaying}>
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
                <Modal.Description className="save-modal-content">
                  {JSON.stringify(maze.mazeInfo)}
                </Modal.Description>
              </Modal.Content>
            </Modal>
            &nbsp; {/* Essentially just a fancy space */}
            <Modal
              centered={false}
              trigger={
                <Button color="blue" circular disabled={isPlaying}>
                  <Icon name="upload" style={{ marginRight: "0.5rem" }} />
                  <span>Load Maze</span>
                </Button>
              }
            >
              <Modal.Header>Paste your maze in the text box</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  {/* Trying to hook up this textarea to capture maze info
                    inspration, https://react.semantic-ui.com/collections/form/#usage-capture-values */}
                  <Form onSubmit={this.loadMaze}>
                    <Form.TextArea
                      style={{ minHeight: 500, minWidth: 800 }}
                      placeholder="Maze Text"
                      name="name"
                      value={pastedMaze}
                      onChange={(e: TextAreaProps) =>
                        this.setState({ pastedMaze: e.value })
                      }
                    />
                    <Message visible={this.state.hasError}>
                      Enter properly formatted json
                    </Message>
                    <Form.Button content="Submit" />
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
            &nbsp; {/* Essentially just a fancy space */}
            <Button
              color="blue"
              circular
              onClick={() => this.setState({ sidebarOpen: true })}
            >
              <Icon name="info" />
            </Button>
            <Sidebar
              as={Menu}
              animation="push"
              overlay
              icon="labeled"
              direction="right"
              onHide={() => this.setState({ sidebarOpen: false })}
              vertical
              visible={sidebarOpen}
              width="very wide"
            >
              <Segment textAlign="left" padded="very">
                <ReactMarkdown source={this.getInfo()} text-color="white" />
              </Segment>
            </Sidebar>
          </Menu.Item>
        </Menu>
        {/* Legend */}
        <Message attached="bottom">
          <Label image>
            <img
              src={process.env.PUBLIC_URL + "./startpoint.png"}
              alt="startpoint tag"
            />
            Start Point
          </Label>
          <Label image>
            <img
              src={process.env.PUBLIC_URL + "./endpoint.png"}
              alt="endpoint tag"
            />
            End Point
          </Label>
          <Label image>
            <img src={process.env.PUBLIC_URL + "./wall.png"} alt="wall tag" />
            Wall
          </Label>
          <Label image>
            <img
              src={process.env.PUBLIC_URL + "./visited.png"}
              alt="visited tag"
            />
            Visited Point
          </Label>
          <Label image>
            <img src={process.env.PUBLIC_URL + "./lava.png"} alt="path tag" />
            Path
          </Label>
        </Message>
      </div>
    );
  }
}

export default MenuBar;
