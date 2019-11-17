const example_grid = [
  [0, 0, 8, 4, 0, 3, 5, 0, 6],
  [0, 0, 3, 1, 0, 2, 0, 0, 4],
  [0, 4, 5, 7, 0, 0, 0, 9, 0],
  [6, 9, 0, 0, 0, 5, 0, 0, 7],
  [0, 8, 0, 0, 0, 0, 0, 5, 0],
  [4, 0, 0, 3, 0, 0, 0, 1, 8],
  [0, 7, 0, 0, 0, 6, 2, 4, 0],
  [1, 0, 0, 5, 0, 7, 8, 0, 0],
  [8, 0, 6, 9, 0, 1, 3, 0, 0]
];

const empty_grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

function solveSudoku2(grid: number[][]): boolean {
  function noConflictsInGrid(sudoku_grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudoku_grid[row][col] !== 0) {
          if (
            cellHasConflicts(sudoku_grid, row, col)
            // !noConflicts(
            //   sudoku_grid,
            //   row ,
            //   col ,
            //   sudoku_grid[row ][col ]
            // )
          ) {
            return false;
          }
        }

        // for (let num = 1; num <= 9; num++) {
        // }
      }
    }
    return true;
  }

  if (noConflictsInGrid(grid)) {
    return solveSudoku(grid, 0, 0);
  }

  return false;
}

function cellHasConflicts(grid: number[][], row, col): boolean {
  function _isRowOk() {
    for (let _col = 0; _col < 9; _col++) {
      if (grid[row][_col] === grid[row][col] && _col !== col) {
        return false;
      }
    }
    return true;
  }
  function _isColOk() {
    for (let _row = 0; _row < 9; _row++) {
      if (grid[_row][col] === grid[row][col] && _row !== row) {
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
          // grid[_row + r][_col + c] !== 0 &&
          grid[_row + r][_col + c] === grid[row][col] &&
          _row + r !== row &&
          _col + c !== col
        ) {
          return false;
        }
      }
    }

    return true;
  }

  if (_isRowOk() && _isColOk() && _isBoxOk()) {
    return false;
  }

  return true;
}

export default function test() {
  console.warn('test');
  const _canSolveSudoku = solveSudoku2(empty_grid);

  console.time('time 1');
  console.log('unsolved');
  printGrid(example_grid);
  solveSudoku(example_grid, 0, 0);
  printGrid(example_grid);
  console.timeEnd('time 1');

  console.log('\n\n\n');

  console.time('time 2');
  printGrid(empty_grid);
  solveSudoku(empty_grid, 0, 0);
  printGrid(empty_grid);
  console.timeEnd('time 2');
}

// recursive algo
function solveSudoku(grid, row, col) {
  const cell = findUnassignedLocation(grid, row, col);
  row = cell[0];
  col = cell[1];

  // base case: if no empty cell
  if (row === -1) {
    console.log('solved');
    return true;
  }

  for (let num = 1; num <= 9; num++) {
    if (noConflicts(grid, row, col, num)) {
      grid[row][col] = num;

      if (solveSudoku(grid, row, col)) {
        return true;
      }

      // mark cell as empty (with 0)
      grid[row][col] = 0;
    }
  }

  // trigger back tracking
  return false;
}

function findUnassignedLocation(grid, row, col) {
  let done = false;
  const res = [-1, -1];

  while (!done) {
    if (row === 9) {
      done = true;
    } else {
      if (grid[row][col] === 0) {
        res[0] = row;
        res[1] = col;
        done = true;
      } else {
        if (col < 8) {
          col++;
        } else {
          row++;
          col = 0;
        }
      }
    }
  }

  return res;
}

function noConflicts2(grid, row, col, num) {
  return (
    isRowOk2(grid, row, num) &&
    isColOk2(grid, col, num) &&
    isBoxOk2(grid, row, col, num)
  );
}

function isRowOk2(grid, row, num) {
  for (let col = 0; col < 9; col++) {
    if (grid[row][col] === num) {
      return false;
    }
  }

  return true;
}
function isColOk2(grid, col, num) {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === num) {
      return false;
    }
  }

  return true;
}
function isBoxOk2(grid, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[row + r][col + c] === num) {
        return false;
      }
    }
  }

  return true;
}

function noConflicts(grid, row, col, num) {
  return (
    isRowOk(grid, row, num) &&
    isColOk(grid, col, num) &&
    isBoxOk(grid, row, col, num)
  );
}

function isRowOk(grid, row, num) {
  for (let col = 0; col < 9; col++) {
    if (grid[row][col] === num) {
      return false;
    }
  }

  return true;
}
function isColOk(grid, col, num) {
  for (let row = 0; row < 9; row++) {
    if (grid[row][col] === num) {
      return false;
    }
  }

  return true;
}
function isBoxOk(grid, row, col, num) {
  row = Math.floor(row / 3) * 3;
  col = Math.floor(col / 3) * 3;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[row + r][col + c] === num) {
        return false;
      }
    }
  }

  return true;
}

function printGrid(grid) {
  let res = '';

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      res += grid[i][j];
    }
    res += '\n';
  }
  console.log(res);
}
