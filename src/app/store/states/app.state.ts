import { IGameState, initialGameState } from './game.state';

export interface IAppState {
  game: IGameState;
}

export const initialAppState: IAppState = {
  game: initialGameState
};

export function getInitialState(): IAppState {
  return initialAppState;
}
