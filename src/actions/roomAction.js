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
  CREATE_CARD: {
    REQUEST: "CREATE_CARD_REQUEST",
    SUCCESS: "CREATE_CARD_RESPONSE",
    FAILED: "CREATE_CARD_FAILED",
  },
  CONNECT_SOCKET: "CONNECT_SOCKET",
  STORE_SOCKET: "STORE_SOCKET",
  ENTER_ROOM: "ENTER_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
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

export function connectSocket(room) {
  return {
    type: actions.CONNECT_SOCKET,
    payload: {
      room,
    },
  };
}

export function enterRoom(room) {
  return {
    type: actions.ENTER_ROOM,
    payload: {
      room,
    },
  };
}

export function leaveRoom(room) {
  return {
    type: actions.LEAVE_ROOM,
    payload: {
      room,
    },
  };
}

export function storeSocket(socket) {
  return {
    type: actions.STORE_SOCKET,
    payload: {
      socket,
    },
  };
}

export function createCard(roomUrl, content, refPageIdx) {
  return {
    type: actions.CREATE_CARD.REQUEST,
    payload: {
      roomUrl,
      content,
      refPageIdx,
    },
  };
}

export function receiveCard(card) {
  return {
    type: actions.CREATE_CARD.SUCCESS,
    payload: {
      card,
    },
  };
}
