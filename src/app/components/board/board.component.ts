import { Component, OnInit } from '@angular/core';

export interface BoardCell {
  row: number;
  column: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  readonly SIZE = 9;
  board: BoardCell[][];

  constructor() {
    this.initBoard();
  }

  ngOnInit() {}

  private initBoard() {
    this.board = [];
    for (let i = 0; i < this.SIZE; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.SIZE; j++) {
        this.board[i][j] = {
          row: i,
          column: j
        };
      }
    }

    // TODO dispatch board to store
    console.warn('board', this.board);
  }
}
