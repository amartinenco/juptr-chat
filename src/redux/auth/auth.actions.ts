
import { ICredentials } from '../../types/credentials.interface';
import IResponseError from '../../types/error.interface';
import ILoggedIn from '../../types/logged-in.interface';
import IRegisterCredentials from '../../types/sign-up.interface';
import { AuthActionTypes } from './auth.types';

export const signInStart = (userCredentials : ICredentials) => ({
  type: AuthActionTypes.SIGN_IN_START,
  payload: userCredentials
});

export const signInSuccess = (user : ILoggedIn) => ({
  type: AuthActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (errors : IResponseError[]) => ({
  type: AuthActionTypes.SIGN_IN_FAILURE,
  payload: errors
});

export const signOutStart = () => ({
  type: AuthActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: AuthActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (errors : IResponseError[]) => ({
  type: AuthActionTypes.SIGN_OUT_FAILURE,
  payload: errors
});

export const checkUserSessionStart = () => ({
  type: AuthActionTypes.CURRENT_USER_SESSION_START
});

export const checkUserSessionSuccess = (user : ILoggedIn) => ({
  type: AuthActionTypes.CURRENT_USER_SESSION_SUCCESS,
  payload: user
});

export const checkUserSessionFailure = () => ({
  type: AuthActionTypes.CURRENT_USER_SESSION_FAILURE
});

export const registrationStart = (registerCredentials: IRegisterCredentials) => ({
  type: AuthActionTypes.REGISTRATION_START,
  payload: registerCredentials
});

export const registrationSuccess = (registeredUser : ILoggedIn) => ({
  type: AuthActionTypes.REGISTRATION_SUCCESS,
  payload: registeredUser
});

export const registrationFailure = (error : IResponseError[]) => ({
  type: AuthActionTypes.REGISTRATION_FAILURE,
  payload: error
});

export const clearAuthErrors = () => ({
  type: AuthActionTypes.RESET_ERRORS 
});