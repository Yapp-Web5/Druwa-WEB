export const actions = {
  CREATE_ROOM: {
    REQUEST: "CREATE_ROOM_REQUEST",
    SUCCESS: "CREATE_ROOM_SUCCESS",
    FAILED: "CREATE_ROOM_FAILED",
  },
  GET_ROOM: {
    REQUEST: "GET_ROOM_REQUEST",
    SUCCESS: "GET_ROOM_SUCCESS",
    FAILED: "GET_ROOM_FAILED",
  },
  ENTER_ROOM: {
    REQUEST: "ENTER_ROOM_REQUEST",
    SUCCESS: "ENTER_ROOM_SUCCESS",
    FAILED: "ENTER_ROOM_FAILED",
  },
  CREATE_CARD: {
    REQUEST: "CREATE_CARD_REQUEST",
    SUCCESS: "CREATE_CARD_RESPONSE",
    FAILED: "CREATE_CARD_FAILED",
  },
};

export function createRoomRequest({ title, lecturer, password }) {
  return {
    type: actions.CREATE_ROOM.REQUEST,
    payload: {
      title,
      lecturer,
      password,
    },
  };
}

export function createRoomSuccess(room) {
  return {
    type: actions.CREATE_ROOM.SUCCESS,
    payload: {
      room,
    },
  };
}

export function createRoomFailed() {
  return {
    type: actions.CREATE_ROOM.FAILED,
  };
}

export function getRoomRequest(roomUrl) {
  return {
    type: actions.GET_ROOM.REQUEST,
    payload: {
      roomUrl,
    },
  };
}

export function getRoomSuccess(room) {
  return {
    type: actions.GET_ROOM.SUCCESS,
    payload: {
      room,
    },
  };
}

export function getRoomFailed() {
  return {
    type: actions.GET_ROOM.FAILED,
  };
}

export function enterRoomRequest(room) {
  return {
    type: actions.ENTER_ROOM.REQUEST,
    payload: {
      room,
    },
  };
}

export function enterRoomSuccess() {
  return {
    type: actions.ENTER_ROOM.SUCCESS,
  };
}
