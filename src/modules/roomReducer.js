import { actions } from "actions/roomAction";

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
    case actions.GET_ROOM.SUCCESS: {
      const { room } = action.payload;
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
