import { IGameState, BoardCell } from 'src/app/types';
import { numberUsageInfoHandler } from './numberUsageInfoHandler';
import { produceNewBoard } from './produceNewBoard';

export function stateFromClearUserCellValue(state: IGameState): IGameState {
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
