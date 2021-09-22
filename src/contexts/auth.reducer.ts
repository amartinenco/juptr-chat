import {AuthActionTypes, AuthAction, AuthState } from './auth.types';

export const AuthReducer = (state: AuthState, action: AuthAction) : AuthState => {
	switch (action.type) {
		case AuthActionTypes.REQUEST_LOGIN:
			return {
				...state,
				loading: true,
			};
		case AuthActionTypes.LOGIN_SUCCESS:
			return {
				...state,
				user: action.payload?.user,
				loading: false,
				errorMessage: {
					msg: ''
				},
			};
		case AuthActionTypes.LOGOUT:
			return {
				...state,
				user: {
					displayName: '',
					email: '',
					fullName: '',
					id: '' 
				},
				loading: false,
				errorMessage: {
					msg: ''
				},
			}
		case AuthActionTypes.LOGIN_ERROR:
			return {
				...state,
				user: {
					displayName: '',
					email: '',
					fullName: '',
					id: '' 
				},
				loading: false,
				errorMessage: action.error,
			};
		case AuthActionTypes.CHECK_USER_SESSION:
			return {
				...state,
				loading: true,
			};
		case AuthActionTypes.CURRENT_USER_SESSION:
			return {
				...state,
				user: action.payload?.user,
				loading: false
			};
		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};