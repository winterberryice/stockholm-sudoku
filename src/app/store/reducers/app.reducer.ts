import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../states/app.state';
import { gameReducer } from './game.reducer';

export const appReducer: ActionReducerMap<IAppState, any> = {
  game: gameReducer
};
