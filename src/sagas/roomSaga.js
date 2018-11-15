import {
  all,
  takeLatest,
  call,
  put,
  takeEvery,
  take,
  fork,
} from "redux-saga/effects";

import * as socketUtils from "utils/socketFactory";

import {
  actions,
  getRoomSuccess,
  createRoomSuccess,
  connectSocket,
  enterRoom,
  leaveRoom,
  receiveCard,
} from "actions/roomAction";
import {
  getRoom as getRoomAPI,
  createRoom as createRoomAPI,
} from "api/RoomAPI";
import { createCard as createCardAPI } from "api/CardAPI";

function* createRoom(action) {
  const { title, lecturer, password } = action.payload;
  const room = yield call(createRoomAPI, { title, lecturer, password });
  yield put(createRoomSuccess(room));
}

function* getRoom(action) {
  const { roomUrl } = action.payload;
  const room = yield call(getRoomAPI, roomUrl);
  yield put(getRoomSuccess(room));
  yield put(connectSocket(room));
}

function* onMessage(socket, type, callback) {
  const channel = yield call(socketUtils.createSocketChannel, socket, type);

  while (true) {
    try {
      const message = yield take(channel);
      yield put(callback(message.room));
    } catch (e) {
      alert(e.message);
    }
  }
}

function* listenSocket(action) {
  const { room } = action.payload;
  const socket = socketUtils.connectSocket(room);
  yield fork(onMessage, socket, "enter", enterRoom);
  yield fork(onMessage, socket, "leave", leaveRoom);
}

function* createCard(action) {
  const { roomUrl, content, refPageIdx } = action.payload;
  const card = yield call(createCardAPI, roomUrl, content, refPageIdx);
  yield put(receiveCard(card));
}

export default function* saga() {
  yield all([
    takeLatest(actions.GET_ROOM.REQUEST, getRoom),
    takeLatest(actions.CREATE_ROOM.REQUEST, createRoom),
    takeLatest(actions.CONNECT_SOCKET, listenSocket),
    takeEvery(actions.CREATE_CARD.REQUEST, createCard),
  ]);
}
