import { Action } from '@ngrx/store';

export enum EGameActions {
  Increment = 'INCREMENT',
  Decrement = 'DECREMENT',
  NewGame = 'New game',
  SelectCell = 'Select cell',
  FillCellValue = 'Fill cell value',
  ClearUserCellValue = 'Clear User Cell Value'
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

export interface FillCellValuePayload {
  value: number;
}

export class FillCellValue implements Action {
  public readonly type = EGameActions.FillCellValue;
  constructor(readonly payload: FillCellValuePayload) {}
}

export class ClearUserCellValue implements Action {
  public readonly type = EGameActions.ClearUserCellValue;
}

export type GameActions =
  | NewGame
  | IncrementCounter
  | DecrementCounter
  | SelectCell
  | FillCellValue
  | ClearUserCellValue;
