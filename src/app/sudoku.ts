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
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const _grid = [
  [0, 2, 1, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];

export class Sudoku {
  private counter = 0;
  readonly coordsToGenerate = [
    [0, 0],
    [0, 2],
    [0, 4],
    [0, 6],
    [0, 7],
    [0, 8],
    [2, 7],
    [1, 6],
    [1, 2],
    [4, 4],
    [3, 3],
    [3, 5],
    [6, 6],
    [6, 8],
    [7, 0],
    [7, 2],
    [1, 8],
    [4, 0],
    [2, 2],
    [5, 3],
    [5, 7],
    [8, 5],
    [8, 8]
  ];

  public generateBoard() {
    console.time('generate');

    let canSolve = false;
    let randomLevel = this.coordsToGenerate.length;
    let board = this.randomFill(randomLevel);

    function lowerRandomLevel() {
      if (randomLevel > 10) {
        randomLevel--;
      }
    }

    while (!canSolve) {
      canSolve = this.noConflictsInGrid(board);
      if (!canSolve) {
        board = this.randomFill(randomLevel);
      } else {
        try {
          canSolve = this.solveSudoku(board, 0, 0);
        } catch (error) {
          canSolve = false;
          lowerRandomLevel();
          board = this.randomFill(randomLevel);
          console.warn('next try');
        }
      }
    }

    printGrid(board);
    console.log(this.counter, '___\n', randomLevel, '_________________\n\n\n');
    console.timeEnd('generate');
    return board;
  }

  private randomFill(level: number) {
    const _board = empty_grid.map(function(arr) {
      return arr.slice();
    });

    for (let i = 0; i < level; i++) {
      const item = this.coordsToGenerate[i];
      _board[item[0]][item[1]] = getRandomInt(1, 9);
    }

    return _board;
  }

  private noConflictsInGrid(sudoku_grid: number[][]): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (sudoku_grid[row][col] !== 0) {
          if (this.cellHasConflicts(sudoku_grid, row, col)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  private cellHasConflicts(
    grid: number[][],
    row: number,
    col: number
  ): boolean {
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

  private solveSudoku(grid: number[][], row: number, col: number) {
    this.counter++;

    if (this.counter > 2000) {
      this.counter = 0;
      throw Error('try another board');
    }

    const cell = this.findUnassignedLocation(grid, row, col);
    row = cell[0];
    col = cell[1];

    // base case: if no empty cell
    if (row === -1) {
      console.log('solved');
      return true;
    }

    for (let num = 1; num <= 9; num++) {
      if (this.noConflicts(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSudoku(grid, row, col)) {
          return true;
        }

        // mark cell as empty (with 0)
        grid[row][col] = 0;
      }
    }

    // trigger back tracking
    return false;
  }

  private findUnassignedLocation(grid: number[][], row: number, col: number) {
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

  private noConflicts(grid: number[][], row: number, col: number, num: number) {
    function isRowOk() {
      for (let _col = 0; _col < 9; _col++) {
        if (grid[row][_col] === num) {
          return false;
        }
      }

      return true;
    }
    function isColOk() {
      for (let _row = 0; _row < 9; _row++) {
        if (grid[_row][col] === num) {
          return false;
        }
      }

      return true;
    }
    function isBoxOk() {
      const _row = Math.floor(row / 3) * 3;
      const _col = Math.floor(col / 3) * 3;

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (grid[_row + r][_col + c] === num) {
            return false;
          }
        }
      }

      return true;
    }

    return isRowOk() && isColOk() && isBoxOk();
  }
}

function printGrid(grid: number[][]) {
  let res = '';

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      res += grid[i][j];
    }
    res += '\n';
  }
  console.log(res);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
