import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/states/app.state';
import {
  FillCellValue,
  ClearUserCellValue
} from 'src/app/store/actions/game.action';

@Component({
  selector: 'app-board-controls',
  templateUrl: './board-controls.component.html',
  styleUrls: ['./board-controls.component.scss']
})
export class BoardControlsComponent implements OnInit {
  controlsModel: { value: number }[] = [];

  constructor(private _store: Store<IAppState>) {
    for (let i = 1; i <= 10; i++) {
      this.controlsModel.push({ value: i % 10 });
    }
  }

  ngOnInit() {}

  trackByFn(index: any, _item: any) {
    return index;
  }

  onClick(value: number) {
    if (value !== 0) {
      this._store.dispatch(new FillCellValue({ value }));
    } else {
      this._store.dispatch(new ClearUserCellValue());
    }
  }
}
