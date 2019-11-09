import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

export interface BoardCell {
  row: number;
  column: number;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly SIZE = 9;
  board: BoardCell[][];

  @ViewChild('myDiv') divView: ElementRef<HTMLDivElement>;

  constructor() {
    this.initBoard();
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log('board init after', this.divView);
    window.addEventListener('resize', this.resizeHandler);
    this.setDivHeight();
  }

  private resizeHandler(e: UIEvent) {
    console.log('resize', window.outerWidth, '\n\n', e);
    this.setDivHeight();
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  private setDivHeight() {
    this.divView.nativeElement.style.height =
      this.divView.nativeElement.clientWidth + 'px';
  }

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
