import {AuthActionTypes, AuthState } from './auth.types';

interface IAuthAction {
  type: AuthActionTypes;
	payload?: any;
}

export const authInitialState : AuthState = {
  user: null,
  loading: false,
  errorMessage: []
}

const AuthReducer = (state: AuthState = authInitialState, action: IAuthAction) : AuthState => {
	switch (action.type) {
		case AuthActionTypes.CURRENT_USER_SESSION_START:
			return {
				...state,
				loading: true,
			};
		case AuthActionTypes.CURRENT_USER_SESSION_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload
			};
		case AuthActionTypes.RESET_ERRORS: 
			return {
				...state,
				errorMessage: []
			}
		case AuthActionTypes.SIGN_IN_SUCCESS:
			return {
				...state,
				user: action.payload,
				loading: false,
				errorMessage: []
			};
		case AuthActionTypes.SIGN_IN_START:
			return {
				...state,
				loading: true
			};
		case AuthActionTypes.SIGN_OUT_SUCCESS:
			return {
				user: null,
				loading: false,
				errorMessage: []
			};
		case AuthActionTypes.REGISTRATION_START:
			return {
				...state,
				loading: true
			};
		case AuthActionTypes.REGISTRATION_SUCCESS:
			return {
				...state,
				loading: false,
				errorMessage: [],
				user: action.payload
			};
		case AuthActionTypes.CURRENT_USER_SESSION_FAILURE:
			return {
				...state,
				loading: false,
				user: null,
				errorMessage: []
			};
		case AuthActionTypes.SIGN_IN_FAILURE:
		case AuthActionTypes.SIGN_OUT_FAILURE:
		case AuthActionTypes.REGISTRATION_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: (action.payload)?action.payload:[] 
			};
		default:
			return state;
	}
}

// const AuthReducer = (state: AuthState, action: AuthAction) : AuthState => {
// 	switch (action.type) {
// 		case AuthActionTypes.RESET_ERRORS:
// 			return {
// 				...state,
// 				errorMessage: [],
// 			};
// 		case AuthActionTypes.REQUEST_LOGIN:
// 			return {
// 				...state,
// 				loading: true,
// 			};
// 		case AuthActionTypes.LOGIN_SUCCESS:
// 			return {
// 				...state,
// 				user: action.payload?.user,
// 				loading: false,
// 				errorMessage: [],
// 			};
// 		case AuthActionTypes.LOGOUT:
// 			return {
// 				...state,
// 				user: {
// 					displayName: '',
// 					email: '',
// 					fullName: '',
// 					id: '' 
// 				},
// 				loading: false,
// 				errorMessage: []
// 			};
// 		case AuthActionTypes.LOGIN_ERROR:
// 			return {
// 				...state,
// 				user: {
// 					displayName: '',
// 					email: '',
// 					fullName: '',
// 					id: '' 
// 				},
// 				loading: false,
// 				errorMessage: action.error!,
// 			};
// 		case AuthActionTypes.CHECK_USER_SESSION:
// 			return {
// 				...state,
// 				loading: true,
// 			};
// 		case AuthActionTypes.CURRENT_USER_SESSION:
// 			return {
// 				...state,
// 				user: action.payload?.user,
// 				loading: false
// 			};
// 		case AuthActionTypes.REQUEST_REGISTRATION:
// 			return {
// 				...state,
// 				loading: true,
// 			};
// 		case AuthActionTypes.REGISTRATION_SUCCESS:
// 			return {
// 				...state,
// 				loading: false,
// 				errorMessage: []
// 			};
// 		case AuthActionTypes.REGISTRATION_ERROR:
// 			return {
// 				...state,
// 				loading: false,
// 				errorMessage: action.error!,
// 			};
// 		default:
// 			throw new Error(`Unhandled action type: ${action.type}`);
// 	}
// };

export default AuthReducer;