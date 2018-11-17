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
    case actions.CREATE_CARD.REQUEST: {
      return {
        ...state,
      };
    }
    case actions.CREATE_CARD.SUCCESS: {
      const { card } = action.payload;
      const idx = state.room.cards.findIndex(item => {
        return item._id === card._id;
      });
      if (idx !== -1) {
        return {
          ...state,
          room: {
            ...state.room,
            cards: [
              ...state.room.cards.slice(0, idx),
              card,
              ...state.room.cards.slice(idx + 1),
            ],
          },
        };
      } else {
        return {
          ...state,
          room: {
            ...state.room,
            cards: [...state.room.cards, card],
          },
        };
      }
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
