import React, { useReducer } from 'react';
import { AuthReducer } from './auth.reducer';
import { authInitialState } from './auth.types';

const AuthStateContext = React.createContext(authInitialState);

type Props = {
  children?: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
	const [state, dispatch] = useReducer(AuthReducer, authInitialState);

	return (
		<AuthStateContext.Provider value={state}>

		</AuthStateContext.Provider>
	);
};