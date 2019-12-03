import { Action } from '@ngrx/store';
import { DifficultyLevel } from 'src/app/types';

export enum EGameActions {
  NewGame = 'New game',
  SelectCell = 'Select cell',
  FillCellValue = 'Fill cell value',
  IncrementGameTime = 'Increment game time'
}

export interface NewGamePayload {
  value: DifficultyLevel;
}

export class NewGame implements Action {
  public readonly type = EGameActions.NewGame;
  constructor(readonly payload?: NewGamePayload) {}
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

export interface IncrementGameTimePayload {
  ticks: number;
}

export class IncrementGameTime implements Action {
  public readonly type = EGameActions.IncrementGameTime;
  constructor(readonly payload?: IncrementGameTimePayload) {}
}

export type GameActions =
  | NewGame
  | SelectCell
  | FillCellValue
  | IncrementGameTime;
