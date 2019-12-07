import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectCounter,
  getDifficultyLevel,
  getGameTime
} from 'src/app/store/selectors/game.selector';
import { DifficultyLevel } from 'src/app/types';
import { IAppState } from 'src/app/store/states/app.state';
import { NewGame, IncrementGameTime } from 'src/app/store/actions/game.action';

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
  gameTime: number;

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

    const gameTime$ = this._store.select(getGameTime);
    gameTime$.subscribe(gameTime => {
      this.gameTime = gameTime;
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

  getElapsedTime() {
    return display(this.gameTime);
  }
}

function pad(num: number | string, size: number) {
  let s = String(num);
  while (s.length < (size || 2)) {
    s = '0' + s;
  }
  return s;
}

function display(seconds: number) {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  if (h > 0) {
    return `${pad(h, 2)}:${pad(m, 2)}:${pad(s, 2)}`;
  } else {
    return `${pad(m, 2)}:${pad(s, 2)}`;
  }
}

interface DifficultyLevelOption {
  name: string;
  value: DifficultyLevel;
}
