import { initialGameState, IGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload,
  FillCellValuePayload
} from '../actions/game.action';
import { BoardCell } from 'src/app/components/board/board.component';

const SIZE = 9;

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
      return stateFromNewGame();
    case EGameActions.SelectCell:
      return stateFromSelectCell(state, action.payload);
    case EGameActions.FillCellValue:
      return stateFromFillCellValue(state, action.payload);
    default:
      return state;
  }
};

function produceNewBoard(
  board: BoardCell[][],
  transformFn: (cell: BoardCell) => BoardCell
): BoardCell[][] {
  const newBoard: BoardCell[][] = [];

  board.forEach(element => {
    const rowArray: BoardCell[] = [];
    element.forEach(cell => {
      const newCell: BoardCell = transformFn(cell);
      rowArray.push(newCell);
    });
    newBoard.push(rowArray);
  });

  return newBoard;
}

function stateFromNewGame(): IGameState {
  const board: BoardCell[][] = [];
  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = {
        row: i,
        column: j,
        selected: false,
        cellValue: null
      };
    }
  }

  return {
    board,
    counter: 0,
    hasSelectedCell: false
  };
}

function stateFromSelectCell(
  state: IGameState,
  payload: SelectCellActionPayload
): IGameState {
  let hasSelectedCell = false;

  const newBoard: BoardCell[][] = produceNewBoard(state.board, cell => {
    let isSelected = false;
    if (cell.row === payload.row && cell.column === payload.column) {
      isSelected = true;
      hasSelectedCell = true;
    }
    return { ...cell, selected: isSelected };
  });

  return {
    ...state,
    board: newBoard,
    hasSelectedCell
  };
}

function stateFromFillCellValue(
  state: IGameState,
  payload: FillCellValuePayload
): IGameState {
  const { value } = payload;
  let newBoard: BoardCell[][] = state.board;

  if (state.hasSelectedCell) {
    newBoard = produceNewBoard(state.board, cell => {
      let cellValue: number = cell.cellValue;
      if (cell.selected) {
        cellValue = value;
      }
      return { ...cell, cellValue };
    });
  }

  return { ...state, board: newBoard };
}
