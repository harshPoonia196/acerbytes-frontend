import { SET_DRAWER_STATE_OPEN, SET_DRAWER_STATE_CLOSE } from "./type";

export const setDrawerStateOpen = (payload) => (dispatch) => {
  return dispatch({
    type: SET_DRAWER_STATE_OPEN,
    payload: payload,
  });
};

export const setDrawerStateClose = (payload) => (dispatch) => {
  return dispatch({
    type: SET_DRAWER_STATE_CLOSE,
    payload: payload,
  });
};
