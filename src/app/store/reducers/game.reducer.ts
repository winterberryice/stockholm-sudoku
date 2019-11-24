import { initialGameState } from '../states/game.state';
import {
  EGameActions,
  GameActions,
  SelectCellActionPayload,
  FillCellValuePayload
} from '../actions/game.action';
import { Sudoku, getRandomInt } from 'src/app/sudoku';
import {
  IGameState,
  BoardCell,
  SelectedPosition,
  NumberUsageInfo
} from 'src/app/types';

const SIZE = 9;

export function gameReducer(
  state = initialGameState,
  action: GameActions
): IGameState {
  switch (action.type) {
    case EGameActions.NewGame:
      return stateFromNewGame(state);
    case EGameActions.SelectCell:
      return stateFromSelectCell(state, action.payload);
    case EGameActions.FillCellValue:
      return stateFromFillCellValue(state, action.payload);
    case EGameActions.ClearUserCellValue:
      return stateFromClearUserCellValue(state);
    default:
      return state;
  }
}

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
        highlightRowColumnBox: false,
        highlightNumber: false
      };
    }
  }

  const { numberUsageInfo, countCell } = numberUsageInfoHandler();

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
        countCell(cell);
      }
    }
  }

  setReadonlyCells();

  return {
    ...state,
    counter: 0,
    board,
    hasSelectedCell: false,
    numberUsageInfo
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
  function getSelectedCellValue() {
    const selectedBoardCell =
      state.board[selectedPosition.row][selectedPosition.col];
    if (selectedBoardCell.readonly) {
      return selectedBoardCell.solveValue;
    } else {
      return selectedBoardCell.userValue;
    }
  }
  const selectedCellValue = getSelectedCellValue();

  function isSameRowColumnBox(cell: BoardCell): boolean {
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

  function isNumberHighlighted(cell: BoardCell): boolean {
    if (
      (cell.readonly && cell.solveValue === selectedCellValue) ||
      (cell.userValue != null && cell.userValue === selectedCellValue)
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
      highlightRowColumnBox: isSameRowColumnBox(cell),
      highlightNumber: isNumberHighlighted(cell)
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
  const { numberUsageInfo, countCell } = numberUsageInfoHandler();

  if (state.hasSelectedCell) {
    newBoard = produceNewBoard(state.board, cell => {
      let cellValue: number = cell.userValue;
      if (cell.selected) {
        cellValue = value;
      }
      const newCell = { ...cell, userValue: cellValue };
      countCell(newCell);
      return { ...newCell };
    });
  }

  return { ...state, board: newBoard, numberUsageInfo };
}

function stateFromClearUserCellValue(state: IGameState): IGameState {
  let newBoard: BoardCell[][] = state.board;

  const { numberUsageInfo, countCell } = numberUsageInfoHandler();

  if (state.selectedPosition) {
    const selectedCell =
      state.board[state.selectedPosition.row][state.selectedPosition.col];

    if (!selectedCell.readonly) {
      newBoard = produceNewBoard(state.board, cell => {
        let userValue = cell.userValue;
        if (
          cell.row === state.selectedPosition.row &&
          cell.column === state.selectedPosition.col
        ) {
          userValue = null;
        }
        const newCell = { ...cell, userValue };
        countCell(newCell);
        return { ...newCell };
      });
    }
  }

  return { ...state, board: newBoard, numberUsageInfo };
}

function numberUsageInfoHandler() {
  function initNumberUsageInfo() {
    const _numberUsageInfo = {};
    for (let i = 1; i <= 9; i++) {
      _numberUsageInfo[i] = 0;
    }
    return _numberUsageInfo;
  }
  const numberUsageInfo: NumberUsageInfo = initNumberUsageInfo();

  function countCell(cell: BoardCell) {
    if (cell.userValue != null) {
      numberUsageInfo[cell.userValue] = numberUsageInfo[cell.userValue] + 1;
    }
  }

  return {
    numberUsageInfo,
    countCell
  };
}
