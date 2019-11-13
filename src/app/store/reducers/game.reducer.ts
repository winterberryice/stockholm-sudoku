import { initialGameState, IGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload
} from '../actions/game.action';
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
    case EGameActions.SelectCell:
      return {
        ...state,
        board: getBoardAfterCellSelect(state.board, action.payload)
      };
    default:
      return state;
  }
};

function getBoardAfterCellSelect(
  board: BoardCell[][],
  payload: SelectCellActionPayload
): BoardCell[][] {
  const result: BoardCell[][] = [];

  board.forEach(element => {
    const rowArray: BoardCell[] = [];
    element.forEach(cell => {
      let isSelected = false;
      if (cell.row === payload.row && cell.column === payload.column) {
        isSelected = true;
      }
      const newCell: BoardCell = { ...cell, selected: isSelected };
      rowArray.push(newCell);
    });
    result.push(rowArray);
  });

  return result;
}

const SIZE = 9;

function initBoard() {
  const board: BoardCell[][] = [];
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = {
        row: i,
        column: j,
        selected: false
      };
    }
  }

  console.warn('board created: ', board);
  return board;
}
