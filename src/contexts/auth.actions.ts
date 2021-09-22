import { Dispatch } from 'react';
import { AuthAction, AuthActionTypes } from './auth.types';
import { ICredentials } from '../types/credentials.interface';
import axios, { AxiosResponse } from 'axios';
import ILoggedIn from '../types/logged-in.interface';

const ROOT_URL = 'http://localhost:5000';

export async function loginUser(dispatch: Dispatch<AuthAction>, loginPayload: ICredentials) {

  try {
    dispatch({ type: AuthActionTypes.REQUEST_LOGIN }) ;
    const response: AxiosResponse<ILoggedIn> = await axios({ 
      url: `${ROOT_URL}/v1/auth/signin`, 
      method: 'POST',
      data: loginPayload,
      withCredentials: true
    });

    if (response.data && response.data.displayName) {
      dispatch({ 
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user: response.data }
      });
    }
    return response;
  } catch (error: any) {
    if (error.response.data.errors) {
      console.log(error.response.data.errors);
      dispatch({ 
        type: AuthActionTypes.LOGIN_ERROR,
        error: error.response.data.errors[0]
      });
    } else {
      throw new Error('Request failed');
    }
  }
}

export async function logout(dispatch : Dispatch<AuthAction>) {
	dispatch({ type: AuthActionTypes.LOGOUT });
}

export async function checkUserSession(dispatch: Dispatch<AuthAction>) {
  try {
    dispatch({ type: AuthActionTypes.CHECK_USER_SESSION }) ;
    const response = await axios({ 
      url: `${ROOT_URL}/v1/auth/currentuser`, 
      method: 'GET',
      withCredentials: true
    });
    if (response.data) {
      const { currentUser:  { id, displayName, email, fullName } } = response.data;
      dispatch({ 
        type: AuthActionTypes.CURRENT_USER_SESSION,
        payload: { user : {id, displayName, email, fullName} }
      });
    }
    return response;
  } catch (error: any) {
    dispatch({ type: AuthActionTypes.LOGOUT });
  }
}