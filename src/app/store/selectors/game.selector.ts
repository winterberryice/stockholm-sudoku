import { createSelector } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { SelectCellActionPayload } from '../actions/game.action';
import { IGameState } from 'src/app/types';

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

export const getSelectedPosition = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState) => state.selectedPosition
);

export const getNumberUsageInfo = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState) => state.numberUsageInfo
);

export const getDifficultyLevel = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState) => state.difficultyLevel
);

export const getGameTime = createSelector(
  (state: IAppState) => state.game,
  (state: IGameState) => state.gameTime
);
