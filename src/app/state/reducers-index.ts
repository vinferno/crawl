import {layoutActions, LayoutReducer} from './layout/layout-state';
import {BeingsReducer, beingsActions} from './beings/beings-state';

export const reducers = {
  layoutState: LayoutReducer,
  beingsState: BeingsReducer,
};

export const stateActions = {
  layoutActions,
  beingsActions,
};
