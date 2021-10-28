import { takeLatest, put, all, call } from "@redux-saga/core/effects";
import { ICredentials } from "../../types/credentials.interface";
import IResponseError from "../../types/error.interface";
import ILoggedIn from "../../types/logged-in.interface";
import IRegisterCredentials from "../../types/sign-up.interface";
import { checkUserSessionFailure, checkUserSessionSuccess, registrationFailure, registrationSuccess, signInFailure, signInSuccess, signOutFailure, signOutStart, signOutSuccess } from "./auth.actions";
import { AuthActionTypes } from "./auth.types";
import { checkCurrentUserSession, loginUser, logoutUser, registerUser } from "./auth.utils";

export function* isUserAuthenticated() {
  try {
    const user : ILoggedIn  = yield call(checkCurrentUserSession);
    if (!user) return;
    yield put(checkUserSessionSuccess(user));
  } catch (error) {
    yield put(checkUserSessionFailure());
  }
}

export function* signIn({type, payload}:
  { 
    type: typeof AuthActionTypes.SIGN_IN_START
    payload: ICredentials
  }) {
  try {
    const user : ILoggedIn = yield call(loginUser, payload);
    if (!user) return;
    yield put(signInSuccess(user));
  } catch (error: any) {
    const errors : IResponseError[] = error.response.data.errors;
    yield put(signInFailure(errors));
  }
}

export function* signUp({type, payload}:
  { 
    type: typeof AuthActionTypes.REGISTRATION_START
    payload: IRegisterCredentials
  }) {
  try {
    const registeredUser: ILoggedIn = yield call(registerUser, payload);
    if (!registeredUser) return;
    yield put(registrationSuccess(registeredUser));
    // yield put(signInSuccess(registeredUser));
  } catch(error: any) {
    const errors : IResponseError[] = error.response.data.errors;
    yield put(registrationFailure(errors));
  }
}

export function* signOut() {
  try {
    yield call(logoutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure([{
      msg: 'Failed to signout.'
    }]));
  }
}

// export function* signInAfterRegistration({type, payload}:
//   { 
//     type: typeof AuthActionTypes.REGISTRATION_SUCCESS
//     payload: ILoggedIn
//   }) {
//     try {
//       const user = payload;
//       if (!user) return;
//       yield put(signInSuccess(user));
//     } catch(error) {
//       yield put(signInFailure([]));
//     }
// }

// export function* onSignUpSuccess() {
//   yield takeLatest(AuthActionTypes.REGISTRATION_SUCCESS, signInAfterRegistration);
// }

export function* onSignUpStart() {
  yield takeLatest(AuthActionTypes.REGISTRATION_START, signUp);
}

export function* onSignInStart() {
  yield takeLatest(AuthActionTypes.SIGN_IN_START, signIn);
}

export function* onSignOutStart() {
  yield takeLatest(AuthActionTypes.SIGN_OUT_START, signOut);
}

export function* onCheckUserSessionStart() {
  yield takeLatest(AuthActionTypes.CURRENT_USER_SESSION_START, isUserAuthenticated);
}

export function* authSagas() {
  yield all([
    call(onSignInStart),
    call(onSignUpStart),
    call(onSignOutStart),
    call(onCheckUserSessionStart),
  ]);
};