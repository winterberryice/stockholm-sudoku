import { Action } from '@ngrx/store';

export enum EGameActions {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
  FillCell = 'Fill cell',
  NewGame = 'New game'
}

export class IncrementCounter implements Action {
  public readonly type = EGameActions.Increment;
}

export class DecrementCounter implements Action {
  public readonly type = EGameActions.Decrement;
}

export class NewGame implements Action {
  public readonly type = EGameActions.NewGame;
}

export type GameActions = NewGame | IncrementCounter | DecrementCounter;
