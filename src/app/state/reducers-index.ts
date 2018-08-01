import {ClockReducer, clockActions } from './clock/clock-state';
import {BeingsReducer, beingsActions} from './beings/beings-state';
import {inputsActions, InputsReducer} from './inputs/inputs-state';

export const reducers = {
  clockState: ClockReducer,
  beingsState: BeingsReducer,
  inputsState: InputsReducer,
};

export const stateActions = {
  clockActions,
  beingsActions,
  inputsActions,
};
