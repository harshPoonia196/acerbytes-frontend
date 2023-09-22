import { SET_DRAWER_STATE } from "./type";

export const setDrawerState = (payload) => (dispatch) => {
  return dispatch({
    type: SET_DRAWER_STATE,
    payload: payload,
  });
};
