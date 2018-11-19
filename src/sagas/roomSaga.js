import {
  all,
  takeLatest,
  call,
  put,
  takeEvery,
  take,
  fork,
  select,
} from "redux-saga/effects";

import * as socketUtils from "utils/socketFactory";

import {
  actions,
  getRoomSuccess,
  createRoomSuccess,
  updateRoomSuccess,
  connectSocket,
  enterRoom,
  leaveRoom,
  receiveCard,
  storeSocket,
  removeCard,
  removeCardSocket,
} from "actions/roomAction";

import {
  getRoom as getRoomAPI,
  createRoom as createRoomAPI,
  updateRoom as updateRoomAPI,
} from "api/RoomAPI";

import {
  createCard as createCardAPI,
  likeCard as likeCardAPI,
  unlikeCard as unlikeCardAPI,
  removeCard as removeCardAPI,
} from "api/CardAPI";

function* createRoom(action) {
  const { title, lecturer, password } = action.payload;
  const room = yield call(createRoomAPI, { title, lecturer, password });
  yield put(createRoomSuccess(room));
}

function* updateRoom(action) {
  const { title, lecturer, password, roomUrl } = action.payload;
  yield call(updateRoomAPI, {
    title,
    lecturer,
    password,
    roomUrl,
  });
  yield put(updateRoomSuccess(title, lecturer, password));
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
      console.error(e.message);
    }
  }
}

function* listenCardSocket(socket, type, callback) {
  const channel = yield call(socketUtils.createSocketChannel, socket, type);
  while (true) {
    try {
      const message = yield take(channel);
      yield put(callback(message.card));
    } catch (err) {
      console.error(err.message);
    }
  }
}

function* listenSocket(action) {
  const { room } = action.payload;
  const socket = socketUtils.connectSocket(room);
  yield put(storeSocket(socket));
  yield fork(listenCardSocket, socket, "newCard", receiveCard);
  yield fork(listenCardSocket, socket, "removeCard", removeCardSocket);
  yield fork(onMessage, socket, "enter", enterRoom);
  yield fork(onMessage, socket, "leave", leaveRoom);
}

function* watchCreateCard(action) {
  const { roomUrl, content, refPageIdx } = action.payload;
  const card = yield call(createCardAPI, roomUrl, content, refPageIdx);
  yield put(receiveCard(card));
}

function* watchLikeCard(isLike, action) {
  const { card } = action.payload;
  const room = yield select(state => state.roomReducer.room);
  const api = isLike ? likeCardAPI : unlikeCardAPI;
  const updatedCard = yield call(api, room.url, card._id);
  yield put(receiveCard(updatedCard));
}

function* watchRemoveCard(action) {
  const { card } = action.payload;
  const room = yield select(state => state.roomReducer.room);
  yield call(removeCardAPI, room.url, card._id);
}

export default function* saga() {
  yield all([
    takeLatest(actions.GET_ROOM.REQUEST, getRoom),
    takeLatest(actions.CREATE_ROOM.REQUEST, createRoom),
    takeLatest(actions.UPDATE_ROOM.REQUEST, updateRoom),
    takeLatest(actions.CONNECT_SOCKET, listenSocket),
    takeEvery(actions.CREATE_CARD.REQUEST, watchCreateCard),
    takeEvery(actions.LIKE_CARD.REQUEST, watchLikeCard, true),
    takeEvery(actions.UNLIKE_CARD.REQUEST, watchLikeCard, false),
    takeEvery(actions.REMOVE_CARD.REQUEST, watchRemoveCard),
  ]);
}
