import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { IGameState } from '../states/game.state';
import { SelectCellActionPayload } from '../actions/game.action';

const selectGame = (state: IAppState) => state.game;

export const selectCounter = createSelector(
  selectGame,
  (state: IGameState) => state.counter
);

export const selectBoard = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState) => state.board
);

export const getCell = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState, props: SelectCellActionPayload) => {
    const { row, column } = props;
    if (
      row != null &&
      column != null &&
      state.board &&
      state.board[row] &&
      state.board[row][column]
    ) {
      return state.board[row][column];
    }

    return null;
  }
);
