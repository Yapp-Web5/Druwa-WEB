import { all, takeLatest, call, put } from "redux-saga/effects";

import { actions, getRoomSuccess, createRoomSuccess } from "actions/roomAction";
import {
  getRoom as getRoomAPI,
  createRoom as createRoomAPI,
} from "api/RoomAPI";
import { takeEvery } from "redux-saga";

function* createRoom(action) {
  const { title, lecturer, password } = action.payload;
  const room = yield call(createRoomAPI, { title, lecturer, password });
  yield put(createRoomSuccess(room));
}

function* getRoom(action) {
  const { roomUrl } = action.payload;
  const room = yield call(getRoomAPI, roomUrl);
  yield put(getRoomSuccess(room));
}

export default function* saga() {
  yield all([
    takeLatest(actions.GET_ROOM.REQUEST, getRoom),
    takeLatest(actions.CREATE_ROOM.REQUEST, createRoom),
  ]);
}
