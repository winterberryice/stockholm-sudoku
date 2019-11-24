import { NumberUsageInfo, BoardCell } from 'src/app/types';

export function numberUsageInfoHandler() {
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
