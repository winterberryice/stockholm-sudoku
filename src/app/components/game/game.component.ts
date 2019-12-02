import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { selectCounter } from '../../store/selectors/game.selector';
import { NewGame } from 'src/app/store/actions/game.action';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  counter$ = this._store.pipe(select(selectCounter));

  difficultyLevels = 'easy medium hard'.split(' ');

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {}

  onNewGameClick() {
    this._store.dispatch(new NewGame());
  }

  onDifficultyChange(e) {
    console.log('e: ', e);
  }
}
