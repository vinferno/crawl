export interface InputsState {
  keys: any;
}

const defaultState: InputsState = {
 keys: {}
};

export const INPUTS_UPDATE_KEYS = '[inputs] update height';
export const INPUTS_UPDATE_ALL = '[inputs] update all';

const types = {
  INPUTS_UPDATE_KEYS,
  INPUTS_UPDATE_ALL,
};
export const inputsActions = {
  updateKeys: (payload: any) => {
    return {type: INPUTS_UPDATE_KEYS, payload};
  },
  types,
};

export function InputsReducer(state: InputsState = defaultState, action: any) {
  if (!action.type.includes('[inputs]')) { return state; }
  switch (action.type) {
    case INPUTS_UPDATE_KEYS:
      return {...state, ...{ keys: action.payload}, ...{type: action.type}};
    case INPUTS_UPDATE_ALL:
      return {...state, ...action.payload, ...{type: action.type}};
    default:
      return {...state, type: action.type};
  }
}
