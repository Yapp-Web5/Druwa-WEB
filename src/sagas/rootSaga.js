import { all } from "redux-saga/effects";

import roomSaga from "./roomSaga";
import userSaga from "./userSaga";

export default function* rootSaga() {
  yield all([roomSaga(), userSaga()]);
}
