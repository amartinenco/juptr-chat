import React, { useReducer } from 'react';
import { AuthReducer } from './auth.reducer';
import { AuthAction, authInitialState } from './auth.types';

const AuthStateContext = React.createContext(authInitialState);
const AuthDispatchContext = React.createContext<React.Dispatch<AuthAction>>(() => null);

export function useAuthState() {
	const context = React.useContext(AuthStateContext);
	if (context === undefined) {
		throw new Error('useAuthState must be used within a AuthProvider');
	}

	return context;
}

export function useAuthDispatch() {
	const context = React.useContext(AuthDispatchContext);
	if (context === undefined) {
		throw new Error('useAuthDispatch must be used within a AuthProvider');
	}

	return context;
}

type Props = {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(AuthReducer, authInitialState);

	return (
		<AuthStateContext.Provider value={state}>
			<AuthDispatchContext.Provider value={dispatch}>
				{children}
			</AuthDispatchContext.Provider>
		</AuthStateContext.Provider>
	);
};