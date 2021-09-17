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
      data: loginPayload
    });

    if (response.data && response.data.displayName) {
      console.log(response.data);
      dispatch({ 
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: { user: response.data }
      });
    }
    return response;
  } catch (error: any) {
    if (error.response.data.errors) {
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