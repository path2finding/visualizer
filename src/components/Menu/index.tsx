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
  TextAreaProps
} from "semantic-ui-react";
import { MazeInfo, Space } from "../../models/maze";
import * as yup from "yup";
import { mapValues } from "lodash";
//import { loadMaze } from "../../actions/mazeActions/mazeActions";

export interface MenuProps extends MenuState {
  canMoveStart: boolean;
  canMoveEnd: boolean;
  maze: MazeInfo;
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
}

export const yupSpaceSchema = yup.object({
  type: yup
    .mixed()
    .oneOf(["wall", "empty", "startpoint", "endpoint"])
    .required(),
  visited: yup.bool().required(),
  path: yup.bool().required()
});

class MenuBar extends React.Component<MenuProps, _MenuState> {
  state = {
    value: "",
    showModal: false,
    hasError: false,
    errorMessage: ""
  };

  checkDynamicKeys = (keys: any[]): boolean => {
    for (let i = 0; i < keys.length; i++) {
      const keyIsValid = yup
        .number()
        .required()
        .isValidSync(keys[i]);
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
          errorMessage: "Object should have keys!"
        });
      } else {
        const keysAreValid = this.checkDynamicKeys(keys);
        if (!keysAreValid) {
          this.setState({
            ...this.state,
            hasError: true,
            errorMessage: "Object keys must be numeric!"
          });
        } else {
          const spacesAreValid = this.checkSpace(keys, maze);
          if (!spacesAreValid) {
            this.setState({
              ...this.state,
              hasError: true,
              errorMessage:
                "Spaces required parameters type, visited, and path!"
            });
          } else {
            this.props.loadMaze(maze);
            this.setState({ value: "", showModal: false, hasError: false });
          }
        }
      }
    } catch (e) {
      this.setState({
        ...this.state,
        hasError: true,
        errorMessage: "Maze data must be in JSON format!"
      });
      console.log(e);
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
      handleDropdownChange
    } = this.props;

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
              <Button color="blue" circular onClick={() => saveMaze(maze)}>
                <Icon name="save outline" style={{ marginRight: "0.5rem" }} />
                <span>Save Maze</span>
              </Button>
            }
            centered={false}
          >
            <Modal.Header>Copy this text to save your maze</Modal.Header>
            <Modal.Content>
              <Modal.Description>{JSON.stringify(maze)}</Modal.Description>
            </Modal.Content>
          </Modal>
          &nbsp; {/* Essentially just a fancy space */}
          <Button color="blue" circular onClick={this.handleClick.bind(this)}>
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
                            pointing: "below"
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
        </Menu.Item>
      </Menu>
    );
  }
}

export default MenuBar;
