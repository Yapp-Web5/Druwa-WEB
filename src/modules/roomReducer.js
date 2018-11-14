import { uniq } from "lodash";
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
    case actions.ENTER_ROOM: {
      const { room } = action.payload;
      return {
        ...state,
        room: {
          ...room,
          participants: uniq(room.participants),
        },
      };
    }
    case actions.LEAVE_ROOM: {
      const { room } = action.payload;
      return {
        ...state,
        room: {
          ...room,
          participants: uniq(room.participants),
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
