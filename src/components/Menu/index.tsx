import * as React from "react";
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
  Segment
} from "semantic-ui-react";
import { MazeInfo, Space } from "../../models/maze";
import * as yup from "yup";
import { Maze } from "../../models/maze";
import { SpaceTypes } from "../Space/types";
import { stateContext } from "react-three-fiber";
import algos from "../../algos";

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
}

export interface _MenuState {
  value: string;
  showModal: boolean;
  hasError: boolean;
  errorMessage: string;
  sidebar: boolean;
}

export const yupSpaceSchema = yup.object({
  type: yup
    .mixed()
    .oneOf(["wall", "empty", "startpoint", "endpoint"])
    .required(),
  visited: yup.bool().required(),
  path: yup.bool().required(),
});

class MenuBar extends React.Component<MenuProps, _MenuState> {
  state = {
    value: "",
    showModal: false,
    hasError: false,
    errorMessage: "",
    sidebar: false
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
    // {key: "value"} =>  [0, 1, 2, 3, 4]
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
  handleChange = (
    _: React.FormEvent<HTMLTextAreaElement>,
    data: TextAreaProps
  ): void => {
    this.setState({ value: data.value as string });
  };

  handleSubmit = () => {
    try {
      const maze: MazeInfo = JSON.parse(this.state.value);
      const keys = Object.keys(maze);
      if (keys.length === 0) {
        this.setState({
          ...this.state,
          hasError: true,
          errorMessage: "Object should have keys!",
        });
      } else {
        const keysAreValid = this.checkDynamicKeys(keys);
        if (!keysAreValid) {
          this.setState({
            ...this.state,
            hasError: true,
            errorMessage: "Object keys must be numeric!",
          });
        } else {
          const spacesAreValid = this.checkSpace(keys, maze);
          if (!spacesAreValid) {
            this.setState({
              ...this.state,
              hasError: true,
              errorMessage:
                "Spaces required parameters type, visited, and path!",
            });
          } else {
            const startEndPointsValid = this.checkStartEndPoints(maze);
            if (!startEndPointsValid) {
              this.setState({
                ...this.state,
                hasError: true,
                errorMessage:
                  "Maze can only have one start point and one end point",
              });
            } else {
              this.props.loadMaze(maze);
              this.setState({ value: "", showModal: false, hasError: false });
            }
          }
        }
      }
    } catch (e) {
      this.setState({
        ...this.state,
        hasError: true,
        errorMessage: "Maze data must be in JSON format!",
      });
      console.log(e);
    }
  };

  handleClick = () => {
    this.setState({ ...this.state, showModal: true });
  };

  handleClose = () => {
    this.setState({ ...this.state, showModal: false });
  };

  getInfo = () => {
    let al = this.props.selectedAlgo;
    if (al == null) {
      al = "Select an algorithm";
    } else if (al == "A*") {
      al = algos.a;
    } else if (al == "BFS") {
      al = algos.BFS;
    } else if (al == "DFS") {
      al = algos.DFS;
    } else if (al == "Djikstras") {
      al = algos.Djikstras;
    }
    return al as string;
  };

  setVisible = (b: boolean) => {
    this.setState({ ...this.state, sidebar: b });
  }

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
              <Button color="blue" circular onClick={(e) => saveMaze(mazeInfo)}>
                <Icon name="save outline" style={{ marginRight: "0.5rem" }} />
                <span>Save Maze</span>
              </Button>
            }
            centered={false}
            closeIcon
          >
            <Modal.Header>Copy this text to save your maze</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {JSON.stringify(maze.mazeInfo)}
              </Modal.Description>
            </Modal.Content>
          </Modal>
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="blue" circular onClick={this.handleClick.bind(this)}>
            <Icon name="upload" style={{ marginRight: "0.5rem" }} />
            <span>Load Maze</span>
          </Button>
          <Modal
            centered={false}
            open={this.state.showModal}
            onClose={this.handleClose.bind(this)}
            closeIcon
          >
            <Modal.Header>Paste your maze in the text box</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                {/* Trying to hook up this textarea to capture maze info
                    inspration, https://react.semantic-ui.com/collections/form/#usage-capture-values */}
                <Form onSubmit={this.handleSubmit.bind(this)}>
                  <Form.TextArea
                    style={{ minHeight: 500, minWidth: 800 }}
                    placeholder="Maze Data"
                    label="Maze Data"
                    value={this.state.value}
                    onChange={this.handleChange.bind(this)}
                    error={
                      this.state.hasError
                        ? {
                            content: this.state.errorMessage,
                            pointing: "below",
                          }
                        : false
                    }
                  />
                  <Form.Button content="Submit" />
                </Form>
              </Modal.Description>
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
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="blue" circular onClick = {() => this.setVisible(true)}>
            <Icon name="info" />
          </Button>
          <Sidebar
            as={Menu}
            animation='push'
            overlay
            icon='labeled'
            direction='right'
            onHide={() => this.setVisible(false)}
            vertical
            visible={this.state.sidebar}
            width='very wide'
          >
          <Segment textAlign='left' padded='very'>
           <ReactMarkdown source={this.getInfo()} text-color = "white" />
          </Segment>
          
          </Sidebar>
          
            
            
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
