import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import { selectCounter } from '../../store/selectors/game.selector';
import { NewGame } from 'src/app/store/actions/game.action';
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

  constructor(private _store: Store<IAppState>) {
    this.selectedItem = this.difficultyLevels[0];
  }

  ngOnInit() {}

  get selectedItem() {
    return this._selectedItem;
  }

  set selectedItem(value) {
    this._selectedItem = value;
  }

  onNewGameClick() {
    this._store.dispatch(new NewGame());
  }
}

interface DifficultyLevelOption {
  name: string;
  value: DifficultyLevel;
}
