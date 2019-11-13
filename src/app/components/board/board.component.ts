import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { NewGame } from 'src/app/store/actions/game.action';
import { selectBoard } from 'src/app/store/selectors/game.selector';

export interface BoardCell {
  row: number;
  column: number;
  selected: boolean;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  board$ = this._store.pipe(select(selectBoard));

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    this._store.dispatch(new NewGame());
  }
}
