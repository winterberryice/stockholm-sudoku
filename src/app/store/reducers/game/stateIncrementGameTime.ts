import { IGameState } from 'src/app/types';
import { IncrementGameTimePayload } from '../../actions/game.action';

export function stateIncrementGameTime(
  state: IGameState,
  payload: IncrementGameTimePayload = { ticks: 1 }
): IGameState {
  const { ticks } = payload;

  return { ...state, gameTime: state.gameTime + ticks };
}
