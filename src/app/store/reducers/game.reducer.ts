import { initialGameState, IGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload,
  FillCellValuePayload
} from '../actions/game.action';
import { BoardCell } from 'src/app/components/board/board.component';
import { State } from '@ngrx/store';

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
      return stateFromSelectCell(state, action.payload);
    case EGameActions.FillCellValue:
      return stateFromFillCellValue(state, action.payload);
    default:
      return state;
  }
};

function stateFromSelectCell(
  state: IGameState,
  payload: SelectCellActionPayload
): IGameState {
  const newBoard: BoardCell[][] = [];

  state.board.forEach(element => {
    const rowArray: BoardCell[] = [];
    element.forEach(cell => {
      let isSelected = false;
      if (cell.row === payload.row && cell.column === payload.column) {
        isSelected = true;
      }
      const newCell: BoardCell = { ...cell, selected: isSelected };
      rowArray.push(newCell);
    });
    newBoard.push(rowArray);
  });

  return {
    ...state,
    board: newBoard
  };
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

function stateFromFillCellValue(
  state: IGameState,
  payload: FillCellValuePayload
): IGameState {
  return { ...state };
}
