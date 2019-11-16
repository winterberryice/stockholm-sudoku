import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { BoardCell } from '../board/board.component';
import { getCell } from 'src/app/store/selectors/game.selector';
import { Observable } from 'rxjs';
import { SelectCell } from 'src/app/store/actions/game.action';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent implements OnInit {
  @Input() row: number;
  @Input() column: number;

  boardCell$: Observable<BoardCell>;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this.boardCell$ = this._store.pipe(
      select(getCell, { row: this.row, column: this.column })
    );
  }

  selectCell() {
    this._store.dispatch(
      new SelectCell({
        row: this.row,
        column: this.column
      })
    );
  }
}
