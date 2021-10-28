import { all, call } from "@redux-saga/core/effects";

import { authSagas } from "./auth/auth.sagas";

export default function* rootSaga() {
  yield all([
    authSagas()
  ]);
}