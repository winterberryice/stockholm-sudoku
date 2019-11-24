import { Action } from '@ngrx/store';

export enum EGameActions {
  NewGame = 'New game',
  SelectCell = 'Select cell',
  FillCellValue = 'Fill cell value',
  ClearUserCellValue = 'Clear User Cell Value'
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
  | SelectCell
  | FillCellValue
  | ClearUserCellValue;
