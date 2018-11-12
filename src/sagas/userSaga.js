import { all, takeLatest } from "redux-saga/effects";
import { actions } from "actions/userAction";

function* requestLogin(action) {
  console.log(action);
}

export default function* saga() {
  yield all([takeLatest(actions.LOGIN.REQUEST, requestLogin)]);
}
