import { eventChannel } from "redux-saga";
import * as socketIO from "socket.io-client";

import { SERVER_END_POINT } from "configs/server";

export function connectSocket(room) {
  const token = localStorage.getItem("token");
  const connectOption = {
    query: {
      type: "enter",
      roomUrl: room.url,
      token,
    },
  };
  return socketIO.connect(
    SERVER_END_POINT,
    connectOption
  );
}

export function createSocketChannel(socket, eventType) {
  return eventChannel(emit => {
    const emitter = message => {
      return emit(message);
    };
    socket.on(eventType, emitter);
    return function unsubscribe() {
      socket.off(eventType, emitter);
    };
  });
}

export function closeChannel(channel) {
  if (channel) {
    channel.close();
  }
}
