export interface LayoutState {
  sideNavOpen: boolean;
}

const defaultState: LayoutState = {
  sideNavOpen: true,
};

export const LAYOUT_UPDATE_SIDE_NAV_OPEN = '[layout] update height';
export const LAYOUT_UPDATE_ALL = '[layout] update all';

const types = {
  LAYOUT_UPDATE_SIDE_NAV_OPEN,
  LAYOUT_UPDATE_ALL,
};
export const layoutActions = {
  updateLayoutSideNavOpen: (payload: boolean) => {
    console.log('update', payload)
    return {type: LAYOUT_UPDATE_SIDE_NAV_OPEN, payload};
  },
  types,
};

export function LayoutReducer(state: LayoutState = defaultState, action: any) {
  switch (action.type) {
    case LAYOUT_UPDATE_SIDE_NAV_OPEN:
      console.log('case')
      return {...state, ...{ sideNavOpen: action.payload}, ...{type: action.type}};
    case LAYOUT_UPDATE_ALL:
      return {...state, ...action.payload, ...{type: action.type}};
    default:
      return {...state, type: action.type};
  }
}
