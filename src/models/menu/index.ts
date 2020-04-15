import { DropdownItemProps } from "semantic-ui-react";

export interface MenuState {
  selectedAlgo: string;
  algorithms: DropdownItemProps[];
  isPlaying: boolean;
  canMoveStart: boolean;
  canMoveEnd: boolean;
  speed: DropdownItemProps[];
  currentSpeed: number;
  startTime: Date | number | undefined;
  endTime: Date | number | undefined;
}
