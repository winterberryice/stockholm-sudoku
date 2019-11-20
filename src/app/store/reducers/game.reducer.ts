import { initialGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload,
  FillCellValuePayload
} from '../actions/game.action';
import { Sudoku, getRandomInt } from 'src/app/sudoku';
import {
  DifficultyLevel,
  IGameState,
  BoardCell,
  SelectedPosition
} from 'src/app/types';

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
        readonly: false,
        highlightBackground: false
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
  const selectedPosition: SelectedPosition = {
    col: payload.column,
    row: payload.row
  };
  const rowBoxIndex = Math.floor(selectedPosition.row / 3) * 3;
  const colBoxIndex = Math.floor(selectedPosition.col / 3) * 3;

  function getHighlightBackground(cell: BoardCell): boolean {
    if (
      cell.column === selectedPosition.col ||
      cell.row === selectedPosition.row ||
      (cell.row >= rowBoxIndex &&
        cell.row < rowBoxIndex + 3 &&
        cell.column >= colBoxIndex &&
        cell.column < colBoxIndex + 3)
    ) {
      return true;
    }
    return false;
  }

  const newBoard: BoardCell[][] = produceNewBoard(state.board, cell => {
    let isSelected = false;
    if (cell.row === payload.row && cell.column === payload.column) {
      isSelected = true;
      hasSelectedCell = true;
    }
    return {
      ...cell,
      selected: isSelected,
      highlightBackground: getHighlightBackground(cell)
    };
  });

  return {
    ...state,
    board: newBoard,
    hasSelectedCell,
    selectedPosition
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
