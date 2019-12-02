import { initialGameState } from '../states/game.state';
import { EGameActions, GameActions } from '../actions/game.action';
import { IGameState } from 'src/app/types';
import { stateFromNewGame } from './game/stateFromNewGame';
import { stateFromSelectCell } from './game/stateFromSelectCell';
import { stateFromFillCellValue } from './game/stateFromFillCellValue';

export function gameReducer(
  state = initialGameState,
  action: GameActions
): IGameState {
  switch (action.type) {
    case EGameActions.NewGame:
      return stateFromNewGame(state, action.payload);
    case EGameActions.SelectCell:
      return stateFromSelectCell(state, action.payload);
    case EGameActions.FillCellValue:
      return stateFromFillCellValue(state, action.payload);
    default:
      return state;
  }
}
