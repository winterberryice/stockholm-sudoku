import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { FillCellValue } from 'src/app/store/actions/game.action';
import {
  selectBoard,
  isBoardSolved,
  getGameTime
} from 'src/app/store/selectors/game.selector';
import { BoardCell, DEBUG } from 'src/app/types';
import { Observable } from 'rxjs';

class KeyboardManager {
  constructor(private _store: Store<IAppState>) {
    this.keyupHandler = this.keyupHandler.bind(this);
  }

  keyupHandler(e: KeyboardEvent) {
    if (e.key === '0' || e.key === 'Backspace') {
      this._store.dispatch(new FillCellValue({ value: null }));
    } else {
      const keyValue = parseInt(e.key, 10);
      if (!isNaN(keyValue) && keyValue >= 1 && keyValue <= 9) {
        this._store.dispatch(new FillCellValue({ value: keyValue }));
      }
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
  boardSolved$: Observable<boolean>;
  gameTime$: Observable<number>;

  constructor(private _store: Store<IAppState>) {
    this._keyboardManager = new KeyboardManager(_store);
    _store.subscribe(state => {
      if (DEBUG) {
        window['state'] = state.game;
      }
    });

    this.boardSolved$ = this._store.select(isBoardSolved);
    this.gameTime$ = this._store.select(getGameTime);
  }

  ngOnInit() {
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
