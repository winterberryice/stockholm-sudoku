import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import {
  selectCounter,
  getDifficultyLevel
} from '../../store/selectors/game.selector';
import { NewGame, IncrementGameTime } from 'src/app/store/actions/game.action';
import { DifficultyLevel } from 'src/app/types';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  counter$ = this._store.pipe(select(selectCounter));
  difficultyLevels: DifficultyLevelOption[] = [
    { name: 'Easy', value: DifficultyLevel.easy },
    { name: 'Medium', value: DifficultyLevel.medium },
    { name: 'Hard', value: DifficultyLevel.hard },
    { name: 'Expert', value: DifficultyLevel.expert }
  ];
  private _selectedItem: DifficultyLevelOption;
  private timerHandle;

  constructor(private _store: Store<IAppState>) {
    const difficultyLevel$ = this._store.select(getDifficultyLevel);
    difficultyLevel$.subscribe(difficultyLevel => {
      if (this.selectedItem == null) {
        this.selectedItem = this.difficultyLevels.find(
          p => p.value === difficultyLevel
        );
      }
    });
  }

  ngOnInit() {}

  get selectedItem() {
    return this._selectedItem;
  }

  set selectedItem(difficultyLevelOption) {
    this._selectedItem = difficultyLevelOption;
    this.startNewGame(difficultyLevelOption.value);
  }

  onNewGameClick() {
    this.startNewGame();
  }

  startNewGame(difficultyLevel?: DifficultyLevel) {
    if (difficultyLevel) {
      this._store.dispatch(new NewGame({ value: difficultyLevel }));
    } else {
      this._store.dispatch(new NewGame());
    }

    this.startGameTimer();
  }

  startGameTimer() {
    this.timerHandle = setInterval(() => {
      this._store.dispatch(new IncrementGameTime());
    }, 1000);
  }
}

interface DifficultyLevelOption {
  name: string;
  value: DifficultyLevel;
}
