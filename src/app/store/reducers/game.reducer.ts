import { initialGameState, IGameState } from '../states/game.state';
import { EGameActions, GameActions } from '../actions/game.action';
import { BoardCell } from 'src/app/components/board/board.component';

export const gameReducer = (
  state = initialGameState,
  action: GameActions
): IGameState => {
  switch (action.type) {
    case EGameActions.Increment:
      return {
        ...state,
        counter: state.counter + 1
      };
    case EGameActions.Decrement:
      return {
        ...state,
        counter: state.counter - 1
      };

    case EGameActions.NewGame:
      return {
        ...state,
        board: initBoard()
      };

    default:
      return state;
  }
};

const SIZE = 9;

function initBoard() {
  const board: BoardCell[][] = [];
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = {
        row: i,
        column: j
      };
    }
  }

  console.warn('board created: ', board);
  return board;
}
