
import axios from 'axios';
import { ICredentials } from '../../types/credentials.interface';
import IRegisterCredentials from '../../types/sign-up.interface';
const ROOT_URL = 'http://localhost:5000';

export async function loginUser(loginPayload: ICredentials) {
  try {
    const response = await axios({ 
      url: `${ROOT_URL}/v1/auth/signin`, 
      method: 'POST',
      data: loginPayload,
      withCredentials: true
    });
    const { id, displayName, email, fullName } = response.data;
    return { id, displayName, email, fullName };
  } catch (error) {
    throw error;
  }
}

export async function logoutUser() {
  try {
    const response = await axios({ 
      url: `${ROOT_URL}/v1/auth/signout`, 
      method: 'POST',
      withCredentials: true
    });
    return response;
  } catch(error) {
    throw error;
  }
}

export async function checkCurrentUserSession() {
  try {
    const response = await axios({ 
      url: `${ROOT_URL}/v1/auth/currentuser`, 
      method: 'GET',
      withCredentials: true
    });

    const { currentUser:  { id, displayName, email, fullName } } = response.data;
    return {id, displayName, email, fullName};
  } catch (error) {
    throw error;
  }
}

export async function registerUser(registerPayload: IRegisterCredentials) {
  try {
    const response = await axios({ 
      url: `${ROOT_URL}/v1/auth/signup`, 
      method: 'POST',
      data: registerPayload
    });
    const { id, displayName, email, fullName } = response.data;
    return { id, displayName, email, fullName };
  } catch (error) {
    throw error;
  }
}