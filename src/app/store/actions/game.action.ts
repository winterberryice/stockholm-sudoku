import { Action } from '@ngrx/store';

export enum EGameActions {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
  FillCell = 'Fill cell',
  NewGame = 'New game',
  SelectCell = 'Select cell'
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

export interface SelectCellActionPayload {
  row: number;
  column: number;
}

export class SelectCell implements Action {
  public readonly type = EGameActions.SelectCell;
  constructor(readonly payload: SelectCellActionPayload) {}
}

export type GameActions =
  | NewGame
  | IncrementCounter
  | DecrementCounter
  | SelectCell;
