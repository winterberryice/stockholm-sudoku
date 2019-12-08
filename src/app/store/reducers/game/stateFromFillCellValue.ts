import { IGameState, BoardCell, NumberUsageInfo } from 'src/app/types';
import { FillCellValuePayload } from '../../actions/game.action';
import { numberUsageInfoHandler } from './numberUsageInfoHandler';
import { produceNewBoard } from './produceNewBoard';

export function stateFromFillCellValue(
  state: IGameState,
  payload: FillCellValuePayload
): IGameState {
  const { value } = payload;
  let newBoard: BoardCell[][] = state.board;
  const { numberUsageInfo, countCell } = numberUsageInfoHandler();

  if (state.hasSelectedCell) {
    newBoard = produceNewBoard(state.board, cell => {
      let cellValue: number = cell.userValue;
      if (cell.selected && !cell.readonly) {
        cellValue = value;
      }
      const newCell: BoardCell = {
        ...cell,
        userValue: cellValue
      };

      countCell(newCell);
      return { ...newCell };
    });
  }

  const errorCount = checkErrors(newBoard);
  const boardSolved = checkBoardSolved(errorCount, numberUsageInfo);

  return { ...state, board: newBoard, numberUsageInfo, boardSolved };
}

function checkErrors(grid: BoardCell[][]): number {
  function cellHasConflicts(row: number, col: number): boolean {
    function _isRowOk() {
      for (let _col = 0; _col < 9; _col++) {
        if (
          grid[row][_col].userValue === grid[row][col].userValue &&
          _col !== col
        ) {
          return false;
        }
      }
      return true;
    }
    function _isColOk() {
      for (let _row = 0; _row < 9; _row++) {
        if (
          grid[_row][col].userValue === grid[row][col].userValue &&
          _row !== row
        ) {
          return false;
        }
      }
      return true;
    }
    function _isBoxOk() {
      const _row = Math.floor(row / 3) * 3;
      const _col = Math.floor(col / 3) * 3;

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (
            grid[_row + r][_col + c].userValue === grid[row][col].userValue &&
            _row + r !== row &&
            _col + c !== col
          ) {
            return false;
          }
        }
      }

      return true;
    }

    if (grid[row][col].userValue == null) {
      return false;
    }

    if (_isRowOk() && _isColOk() && _isBoxOk()) {
      return false;
    }

    return true;
  }

  let errorCount = 0;

  grid.forEach(row => {
    row.forEach(cell => {
      cell.hasError = cellHasConflicts(cell.row, cell.column);
      if (cell.hasError) {
        errorCount++;
      }
    });
  });

  return errorCount;
}

function checkBoardSolved(
  errorCount: number,
  numberUsageInfo: NumberUsageInfo
): boolean {
  if (errorCount > 0) {
    return false;
  }
  const values = Object.values(numberUsageInfo);
  return values.every(value => value === 9);
}
