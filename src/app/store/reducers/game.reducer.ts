import { initialGameState, IGameState } from '../states/game.state';
import { EGameActions, GameActions } from '../actions/game.action';

export const gameReducer = (
  state = initialGameState,
  action: GameActions
): IGameState => {
  switch (action.type) {
    case EGameActions.Increment:
      return {
        ...state,
        counter: state.counter + 1
      };
    case EGameActions.Decrement:
      return {
        ...state,
        counter: state.counter - 1
      };
    default:
      return state;
  }
};
