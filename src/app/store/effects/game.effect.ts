import { withLatestFrom, concatMap, map } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectCell, EGameActions } from '../actions/game.action';
import { IAppState } from '../states/app.state';
import { getSelectedPosition } from '../selectors/game.selector';

@Injectable()
export class GameEffects {
  constructor(private actions$: Actions, private store$: Store<IAppState>) {}

  @Effect()
  selectCell$: Observable<Action> = this.actions$.pipe(
    ofType(EGameActions.FillCellValue),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.store$.select(getSelectedPosition)))
    ),
    map(([, selectedPosition]) => {
      return new SelectCell({
        column: selectedPosition.col,
        row: selectedPosition.row
      });
    })
  );
}
