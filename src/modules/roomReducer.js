import * as api from "../api/RoomAPI";

const actions = {
  CREATE_ROOM_REQUEST: "CREATE_ROOM_REQUEST",
  CREATE_ROOM_SUCEESS: "CREATE_ROOM_SUCEESS",
  CREATE_ROOM_FAILED: "CREATE_ROOM_FAILED",
  GET_ROOM_REQUEST: "GET_ROOM_REQUEST",
  GET_ROOM_SUCEESS: "GET_ROOM_SUCEESS",
  GET_ROOM_FAILED: "GET_ROOM_FAILED",
  ENTER_ROOM_REQUEST: "ENTER_ROOM_REQUEST",
  ENTER_ROOM_SUCEESS: "ENTER_ROOM_SUCEESS",
  ENTER_ROOM_FAILED: "ENTER_ROOM_FAILED",
};

export function createRoom({ title, lecturer, password }) {
  return async dispatch => {
    try {
      dispatch({
        type: actions.CREATE_ROOM_REQUEST,
      });
      const data = await api.createRoom({ title, lecturer, password });
      dispatch({
        type: actions.CREATE_ROOM_SUCEESS,
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({
        type: actions.CREATE_ROOM_FAILED,
      });
    }
  };
}

export function getRoom({ url }) {
  return async dispatch => {
    try {
      dispatch({
        type: actions.GET_ROOM_REQUEST,
      });
      const data = await api.getRoom({ roomUrl: url });
      dispatch({
        type: actions.GET_ROOM_SUCEESS,
        payload: {
          data,
        },
      });
    } catch (err) {
      dispatch({
        type: actions.GET_ROOM_FAILED,
      });
    }
  };
}

export function enterRoom({ room }) {
  return async dispatch => {
    try {
      dispatch({
        type: actions.GET_ROOM_REQUEST,
      });
      dispatch({
        type: actions.GET_ROOM_SUCEESS,
        payload: {
          data: room,
        },
      });
    } catch (err) {
      dispatch({
        type: actions.GET_ROOM_FAILED,
      });
    }
  };
}

const initialState = {
  room: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ROOM_REQUEST: {
      return {
        ...state,
      };
    }
    case actions.CREATE_ROOM_SUCEESS: {
      const room = action.payload.data;
      return {
        ...state,
        room,
      };
    }
    case actions.GET_ROOM_SUCEESS: {
      const room = action.payload.data;
      return {
        ...state,
        room,
      };
    }
    default:
      return state;
  }
};

export default reducer;
