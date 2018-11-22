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
  UPDATE_ROOM: {
    REQUEST: "UPDATE_ROOM_REQUEST",
    SUCCESS: "UPDATE_ROOM_SUCCESS",
    FAILED: "UPDATE_ROOM_FAILED",
  },
  CREATE_CARD: {
    REQUEST: "CREATE_CARD_REQUEST",
    SUCCESS: "CREATE_CARD_RESPONSE",
    FAILED: "CREATE_CARD_FAILED",
  },
  LIKE_CARD: {
    REQUEST: "LIKE_CARD_REQUEST",
    SUCCESS: "LIKE_CARD_SUCCESS",
    FAILED: "LIKE_CARD_FAILED",
  },
  UNLIKE_CARD: {
    REQUEST: "UNLIKE_CARD_REQUEST",
    SUCCESS: "UNLIKE_CARD_SUCCESS",
    FAILED: "UNLIKE_CARD_FAILED",
  },
  REMOVE_CARD: {
    REQUEST: "REMOVE_CARD_REQUEST",
    SUCCESS: "REMOVE_CARD_SUCCESS",
    FAILED: "REMOVE_CARD_SUCCESS",
  },
  UPLOAD_PDF: {
    REQUEST: "UPLOAD_PDF_REQUEST",
    SUCCESS: "UPLOAD_PDF_SUCCESS",
    FAILED: "UPLOAD_PDF_FAILED",
  },
  CONNECT_SOCKET: "CONNECT_SOCKET",
  STORE_SOCKET: "STORE_SOCKET",
  ENTER_ROOM: "ENTER_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
};

export function createRoomRequest({ title, lecturer, password, pdfPath }) {
  return {
    type: actions.CREATE_ROOM.REQUEST,
    payload: {
      title,
      lecturer,
      password,
      pdfPath,
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
export function updateRoomRequest({ title, lecturer, password, roomUrl }) {
  return {
    type: actions.UPDATE_ROOM.REQUEST,
    payload: {
      title,
      lecturer,
      password,
      roomUrl,
    },
  };
}

export function updateRoomSuccess(title, lecturer, password) {
  return {
    type: actions.UPDATE_ROOM.SUCCESS,
    payload: {
      title,
      lecturer,
      password,
    },
  };
}

export function updateRoomFailed() {
  return {
    type: actions.UPDATE_ROOM.FAILED,
  };
}

export function uploadPDFRequest(data) {
  return {
    type: actions.UPLOAD_PDF.REQUEST,
    payload: {
      data,
    },
  };
}

export function uploadPDFSuccess(pdfPath) {
  return {
    type: actions.UPLOAD_PDF.SUCCESS,
    payload: {
      pdfPath,
    },
  };
}

export function uploadPDFFailed() {
  return {
    type: actions.UPLOAD_PDF.FAILED,
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

export function likeCard(card) {
  return {
    type: actions.LIKE_CARD.REQUEST,
    payload: {
      card,
    },
  };
}

export function unlikeCard(card) {
  return {
    type: actions.UNLIKE_CARD.REQUEST,
    payload: {
      card,
    },
  };
}

export function removeCard(card) {
  return {
    type: actions.REMOVE_CARD.REQUEST,
    payload: {
      card,
    },
  };
}

export function removeCardSocket(card) {
  return {
    type: actions.REMOVE_CARD.SUCCESS,
    payload: {
      card,
    },
  };
}
