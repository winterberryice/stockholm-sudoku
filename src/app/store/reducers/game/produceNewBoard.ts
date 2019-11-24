import { BoardCell } from 'src/app/types';

export function produceNewBoard(
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
