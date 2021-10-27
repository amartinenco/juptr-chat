import IResponseError from "../../types/error.interface";
import ILoggedIn from "../../types/logged-in.interface";

export type AuthState = {
  user?: ILoggedIn | null;
  errorMessage: IResponseError[];
  loading: boolean;
}

export enum AuthActionTypes {
  SIGN_IN_START = 'SIGN_IN_START',
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE = 'SIGN_IN_FAILURE',

  SIGN_OUT_START = 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE = 'SIGN_OUT_FAILURE',

  REGISTRATION_START = 'REGISTRATION_START',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  REGISTRATION_FAILURE = 'REGISTRATION_FAILURE',

  CURRENT_USER_SESSION = 'CURRENT_USER_SESSION',
  RESET_ERRORS = 'RESET_ERRORS',

  // REQUEST_LOGIN = 'REQUEST_LOGIN',
  // LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  // LOGIN_ERROR = 'LOGIN_ERROR',
  // LOGOUT = 'LOGOUT',
  // CHECK_USER_SESSION = 'CHECK_USER_SESSION',
  // CURRENT_USER_SESSION = 'CURRENT_USER_SESSION',
  // REQUEST_REGISTRATION = 'REQUEST_REGISTRATION',
  // REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  // REGISTRATION_ERROR = 'REGISTRATION_ERROR',
  // RESET_ERRORS = 'RESET_ERRORS'
};

// export type AuthAction = {
//   type: AuthActionTypes;
//   payload?: { user: ILoggedIn};
//   error?: IResponseError[];
// }


// interface ILoggedIn {
//   displayName: string;
//   email: string;
//   fullName: string;
//   id: string;
// }
