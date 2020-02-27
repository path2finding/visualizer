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
}
