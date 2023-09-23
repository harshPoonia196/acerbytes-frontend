import { SET_DRAWER_STATE_OPEN, SET_DRAWER_STATE_CLOSE } from "./type";

const initialState = {
  isDrawerOpen: false,
};

// Creating my reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_STATE_OPEN:
      return { ...state, ...action.payload };
    case SET_DRAWER_STATE_CLOSE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
