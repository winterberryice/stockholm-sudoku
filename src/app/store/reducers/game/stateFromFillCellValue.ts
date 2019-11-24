import { IGameState, BoardCell } from 'src/app/types';
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
