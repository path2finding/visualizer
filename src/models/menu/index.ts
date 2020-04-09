import { DropdownItemProps } from "semantic-ui-react";

export interface MenuState {
  selectedAlgo:
    | string
    | number
    | boolean
    | (string | number | boolean)[]
    | undefined;
  algorithms: DropdownItemProps[];
  isPlaying: boolean;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  speed: DropdownItemProps[];
  currentSpeed: number;
}
