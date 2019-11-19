import { IGameState, DifficultyLevel } from 'src/app/types';

export const initialGameState: IGameState = {
  counter: 0,
  board: [],
  hasSelectedCell: false,
  difficultyLevel: DifficultyLevel.easy
};
