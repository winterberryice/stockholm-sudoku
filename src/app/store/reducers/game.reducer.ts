import { initialGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload,
  FillCellValuePayload
} from '../actions/game.action';
import { Sudoku, getRandomInt } from 'src/app/sudoku';
import { DifficultyLevel, IGameState, BoardCell } from 'src/app/types';

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
      return stateFromNewGame(state);
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

function stateFromNewGame(state: IGameState): IGameState {
  const board: BoardCell[][] = [];
  const { difficultyLevel } = state;
  const valueBoard = new Sudoku().generateBoard();

  for (let i = 0; i < SIZE; i++) {
    board[i] = [];
    for (let j = 0; j < SIZE; j++) {
      board[i][j] = {
        row: i,
        column: j,
        selected: false,
        solveValue: valueBoard[i][j],
        userValue: null,
        readonly: false
      };
    }
  }

  function setReadonlyCells() {
    const result: {
      [key: string]: boolean;
    } = {};

    while (Object.keys(result).length < difficultyLevel) {
      const rowIndex = getRandomInt(0, 8);
      const colIndex = getRandomInt(0, 8);

      const key = `row ${rowIndex}, col ${colIndex}`;

      if (!result[key]) {
        result[key] = true;
        const cell = board[rowIndex][colIndex];
        cell.userValue = cell.solveValue;
        cell.readonly = true;
      }
    }

    console.log('result keys count: ', Object.keys(result).length, result);
  }

  setReadonlyCells();

  return {
    ...state,
    counter: 0,
    board,
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
      let cellValue: number = cell.userValue;
      if (cell.selected) {
        cellValue = value;
      }
      return { ...cell, userValue: cellValue };
    });
  }

  return { ...state, board: newBoard };
}
