import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { getCell } from 'src/app/store/selectors/game.selector';
import { SelectCell } from 'src/app/store/actions/game.action';
import { BoardCell, DEBUG } from 'src/app/types';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() row: number;
  @Input() column: number;
  boardCell: BoardCell;
  DEBUG: boolean;

  constructor(private _store: Store<IAppState>) {
    this.DEBUG = DEBUG;
  }

  ngOnInit() {
    const boardCell$ = this._store.pipe(
      select(getCell, { row: this.row, column: this.column })
    );
    boardCell$.subscribe(boardCell => {
      this.boardCell = boardCell;
    });
  }

  selectCell() {
    this._store.dispatch(
      new SelectCell({
        row: this.row,
        column: this.column
      })
    );
  }

  getCellBackgroundClass() {
    if (this.boardCell) {
      if (this.boardCell.selected) {
        return 'bg-blue-200';
      } else if (this.boardCell.highlightNumber) {
        return 'bg-gray-400';
      } else if (this.boardCell.highlightRowColumnBox) {
        return 'bg-gray-200';
      }
    }
    return '';
  }
}
