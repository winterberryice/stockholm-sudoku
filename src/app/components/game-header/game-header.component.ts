import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectCounter,
  getDifficultyLevel,
  getGameTime,
  isBoardSolved
} from 'src/app/store/selectors/game.selector';
import { DifficultyLevel } from 'src/app/types';
import { IAppState } from 'src/app/store/states/app.state';
import { NewGame, IncrementGameTime } from 'src/app/store/actions/game.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss']
})
export class GameHeaderComponent implements OnInit {
  counter$ = this._store.pipe(select(selectCounter));
  difficultyLevels: DifficultyLevelOption[] = [
    { name: 'Easy', value: DifficultyLevel.easy },
    { name: 'Medium', value: DifficultyLevel.medium },
    { name: 'Hard', value: DifficultyLevel.hard },
    { name: 'Expert', value: DifficultyLevel.expert }
  ];
  private _selectedItem: DifficultyLevelOption;
  private timerHandle;
  gameTime$: Observable<number>;

  constructor(private _store: Store<IAppState>) {}

  ngOnInit() {
    const difficultyLevel$ = this._store.select(getDifficultyLevel);
    difficultyLevel$.subscribe(difficultyLevel => {
      if (this.selectedItem == null) {
        this.selectedItem = this.difficultyLevels.find(
          p => p.value === difficultyLevel
        );
      }
    });

    this.gameTime$ = this._store.select(getGameTime);

    const boardSolved$ = this._store.select(isBoardSolved);
    boardSolved$.subscribe(boardSolved => {
      if (boardSolved) {
        this.stopTimer();
      }
    });
  }

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
    this.stopTimer();

    this.timerHandle = setInterval(() => {
      this._store.dispatch(new IncrementGameTime());
    }, 1000);
  }

  stopTimer() {
    if (this.timerHandle != null) {
      clearInterval(this.timerHandle);
    }
  }
}

interface DifficultyLevelOption {
  name: string;
  value: DifficultyLevel;
}
