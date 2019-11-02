import { Action } from '@ngrx/store';

export enum EGameActions {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT'
}

export class IncrementCounter implements Action {
  public readonly type = EGameActions.Increment;
}

export class DecrementCounter implements Action {
  public readonly type = EGameActions.Decrement;
}

export type GameActions = IncrementCounter | DecrementCounter;
