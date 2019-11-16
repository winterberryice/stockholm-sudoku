import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { NewGame, FillCellValue } from 'src/app/store/actions/game.action';
import { selectBoard } from 'src/app/store/selectors/game.selector';

export interface BoardCell {
  row: number;
  column: number;
  selected: boolean;
  cellValue: number;
}

class KeyboardManager {
  constructor(private _store: Store<IAppState>) {
    this.keyupHandler = this.keyupHandler.bind(this);
  }

  keyupHandler(e: KeyboardEvent) {
    const keyValue = parseInt(e.key, 10);
    if (!isNaN(keyValue) && keyValue >= 1 && keyValue <= 9) {
      this._store.dispatch(new FillCellValue({ value: keyValue }));
    }
  }

  subscribe() {
    document.addEventListener('keyup', this.keyupHandler);
  }
  unsubscribe() {
    document.removeEventListener('keyup', this.keyupHandler);
  }
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  board$ = this._store.pipe(select(selectBoard));
  private _keyboardManager: KeyboardManager;

  constructor(private _store: Store<IAppState>) {
    this._keyboardManager = new KeyboardManager(_store);
  }

  ngOnInit() {
    this._store.dispatch(new NewGame());
    this._keyboardManager.subscribe();
  }

  ngOnDestroy(): void {
    this._keyboardManager.unsubscribe();
  }

  trackItem(_index: number, item: BoardCell) {
    const id = '' + item.row + item.column;
    return id;
  }

  trackRow(index: number, _item: BoardCell[]) {
    return index;
  }
}
