export enum DifficultyLevel {
  easy = 38
}

export interface SelectedPosition {
  row: number;
  col: number;
}

export interface IGameState {
  counter: number;
  board: BoardCell[][];
  hasSelectedCell: boolean;
  difficultyLevel: DifficultyLevel;
  selectedPosition: SelectedPosition;
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
}
