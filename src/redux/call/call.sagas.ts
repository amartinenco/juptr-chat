import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import ILoggedIn from "../../types/logged-in.interface";
import { resetCallState } from "./call.actions";
import { checkUserSessionFailure, checkUserSessionSuccess } from "../auth/auth.actions";
import { checkCurrentUserSession } from "../auth/auth.utils";
import { CallActionTypes, CallStates } from "./call.types";

export function* callState({type, payload}:
  { 
    type: typeof CallActionTypes.SET_CALL_STATE
    payload: typeof CallStates.CALL_AVAILABLE | CallStates.CALL_IN_PROGRESS | CallStates.CALL_REQUESTED 
    | CallStates.CALL_UNAVAILABLE
  }) {
  try {
    const user : ILoggedIn  = yield call(checkCurrentUserSession);
    if (!user) return;
    yield put(checkUserSessionSuccess(user));
  } catch (error) {
    yield put(resetCallState());
    yield put(checkUserSessionFailure());
  }
}

export function* onSetCallState() {
  yield takeLatest(CallActionTypes.SET_CALL_STATE, callState);
}

export function* callSagas() {
  yield all([
    call(onSetCallState),
  ]);
};