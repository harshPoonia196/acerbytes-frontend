import { SET_DRAWER_STATE } from "./type";

const initialState = {
  isDrawerOpen: true,
};

// Creating my reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DRAWER_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
