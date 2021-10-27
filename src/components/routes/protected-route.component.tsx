import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { AuthState } from "../../redux/auth/auth.types";

const ProtectedRoute = ({ component, ...rest }: RouteProps) => {
  
  const user = useSelector((state: AuthState) => state.user);
  const loading = useSelector((state: AuthState) => state.loading);

  if (!component) {
    throw Error("component is undefined");
  }

  const Component = component;

  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (user?.displayName && user?.id && !loading) {      
      return <Component {...props} />;
    }
    return <Redirect to={{ pathname: '/signin' }} />
  };

  return (<Route {...rest} render={render} />);
}

export default ProtectedRoute;