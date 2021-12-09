import { all } from "@redux-saga/core/effects";

import { authSagas } from "./auth/auth.sagas";
import { callSagas } from "./call/call.sagas";

export default function* rootSaga() {
  yield all([
    authSagas(),
    callSagas()
  ]);
}