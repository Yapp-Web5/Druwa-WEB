import { all, takeLatest, call, put } from "redux-saga/effects";
import { actions, loginSuccess } from "actions/userAction";

import { getUser, createUser } from "api/UserAPI";

function* requestLogin() {
  const token = localStorage.getItem("token");

  if (token) {
    const user = yield call(getUser, token);
    yield put(loginSuccess(user));
  }

  if (!token) {
    const user = yield call(createUser);
    localStorage.setItem("token", user.token);
    yield put(loginSuccess(user));
  }
}

export default function* saga() {
  yield all([takeLatest(actions.LOGIN.REQUEST, requestLogin)]);
}
