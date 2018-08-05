export interface BeingsState {
  beings: any;
}

const defaultState: BeingsState = {
  beings: [],
};

export const BEINGS_ADD = '[beings] add being';
export const BEINGS_REMOVE = '[beings] remove being';
export const BEINGS_RESET = '[beings] reset';

const types = {
  BEINGS_ADD,
  BEINGS_REMOVE,
  BEINGS_RESET,
};
export const beingsActions = {
  add: (payload: any) => {
    return {type: BEINGS_ADD, payload};
  },
  remove: (payload: any) => {
    return {type: BEINGS_REMOVE, payload};
  },
  reset: (payload: any) => {
    return {type: BEINGS_RESET, payload};
  },
  types,
};

export function BeingsReducer(state: BeingsState = defaultState, action: any) {
  if (!action.type.includes('[beings]')) {
    return state;
  }
  switch (action.type) {
    case BEINGS_ADD:
      return {...state, ...{beings: state.beings.concat([action.payload])}, ...{type: action.type}};
    case BEINGS_REMOVE:
      return {...state, ...{beings: state.beings.map(being => being.id !== action.payload.id)}, ...{type: action.type}};
    case BEINGS_RESET:
      return {...state, ...{beings: [], ...{type: action.type}} };
    default:
      return {...state, type: action.type};
  }
}
