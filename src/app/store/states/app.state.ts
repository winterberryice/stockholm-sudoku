import { initialGameState } from './game.state';
import { IGameState } from 'src/app/types';

export interface IAppState {
  game: IGameState;
}

export const initialAppState: IAppState = {
  game: initialGameState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
