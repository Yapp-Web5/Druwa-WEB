import { uniq } from "lodash";
import { actions } from "actions/roomAction";

const initialState = {
  room: null,
  socket: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_ROOM.SUCCESS: {
      const { room } = action.payload;
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
    case actions.CREATE_CARD.SUCCESS: {
      const { card } = action.payload;
      return {
        ...state,
        room: {
          ...state.room,
          cards: [...state.room.cards, card],
        },
      };
    }
    case actions.STORE_SOCKET: {
      const { socket } = action.payload;
      return {
        ...state,
        socket,
      };
    }
    default:
      return state;
  }
};

export default reducer;
