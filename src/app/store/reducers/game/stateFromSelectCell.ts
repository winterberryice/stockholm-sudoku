import { IGameState, SelectedPosition, BoardCell } from 'src/app/types';
import { SelectCellActionPayload } from '../../actions/game.action';
import { produceNewBoard } from './produceNewBoard';

export function stateFromSelectCell(
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
