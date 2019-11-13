import { BoardCell } from 'src/app/components/board/board.component';

export interface IGameState {
  counter: number;
  board: BoardCell[][];
}

export const initialGameState: IGameState = {
  counter: 0,
  board: []
};
