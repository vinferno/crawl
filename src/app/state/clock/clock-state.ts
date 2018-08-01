export interface ClockState {
  speed: number;
  phase: string;
  phases: string[];
}

const defaultState: ClockState = {
  speed: 300,
  phase: '',
  phases: [],
};

export const CLOCK_UPDATE_PHASES = '[clock] update phases';
export const CLOCK_UPDATE_SPEED = '[clock] update height';
export const CLOCK_UPDATE_PHASE = '[clock] update phase';
export const CLOCK_UPDATE_ALL = '[clock] update all';

const types = {
  CLOCK_UPDATE_PHASES,
  CLOCK_UPDATE_SPEED,
  CLOCK_UPDATE_PHASE,
  CLOCK_UPDATE_ALL,
};
export const clockActions = {
  updateSpeed: (payload: boolean) => {
    return {type: CLOCK_UPDATE_SPEED, payload};
  },
  updatePhase: (payload: string) => {
    return {type: CLOCK_UPDATE_PHASE, payload};
  },
  updatePhases: (payload: string[]) => {
    return {type: CLOCK_UPDATE_PHASES, payload};
  },
  types,
};

export function ClockReducer(state: ClockState = defaultState, action: any) {
  if (!action.type.includes('[clock]')) { return state; }
  switch (action.type) {
    case CLOCK_UPDATE_SPEED:
      return {...state, ...{ speed: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_PHASE:
      return {...state, ...{ phase: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_PHASES:
      return {...state, ...{ phases: action.payload}, ...{type: action.type}};
    case CLOCK_UPDATE_ALL:
      return {...state, ...action.payload, ...{type: action.type}};
    default:
      return {...state, type: action.type};
  }
}
