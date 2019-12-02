export const SIZE = 9;
export const DEBUG = false;

export enum DifficultyLevel {
  easy = 38,
  medium = 30,
  hard = 25,
  expert = 22
}

export interface SelectedPosition {
  row: number;
  col: number;
}

export interface NumberUsageInfo {
  [number: string]: number;
}

export interface IGameState {
  counter: number;
  board: BoardCell[][];
  hasSelectedCell: boolean;
  difficultyLevel: DifficultyLevel;
  selectedPosition: SelectedPosition;
  numberUsageInfo: NumberUsageInfo;
}

export interface BoardCell {
  row: number;
  column: number;
  selected: boolean;
  solveValue: number;
  userValue: number;
  readonly: boolean;
  highlightRowColumnBox: boolean;
  highlightNumber: boolean;
  hasError: boolean;
}
