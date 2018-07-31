export interface BeingsState {
  beings: any;
}

const defaultState: BeingsState = {
  beings: [],
};

export const BEINGS_ADD = '[beings] add being';

const types = {
  BEINGS_ADD,
};
export const beingsActions = {
  add: (payload: any) => {
    console.log('update', payload);
    return {type: BEINGS_ADD, payload};
  },
  types,
};

export function BeingsReducer(state: BeingsState = defaultState, action: any) {
  switch (action.type) {
    case BEINGS_ADD:
      return {...state, ...{beings: state.beings.concat([action.payload])}, ...{type: action.type}};
    default:
      return {...state, type: action.type};
  }
}
