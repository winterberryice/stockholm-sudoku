export enum DifficultyLevel {
  easy = 38
}

export interface IGameState {
  counter: number;
  board: BoardCell[][];
  hasSelectedCell: boolean;
  difficultyLevel: DifficultyLevel;
}

export interface BoardCell {
  row: number;
  column: number;
  selected: boolean;
  solveValue: number;
  userValue: number;
  readonly: boolean;
}
