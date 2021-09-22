import { CircularProgress } from "@material-ui/core";
import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { useAuthState } from "../../contexts/auth.context";

const ProtectedRoute = ({ component, ...rest }: RouteProps) => {
  
	const { loading, user } = useAuthState();

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

  if (loading) {
    return <CircularProgress />;
  } 

  return (<Route {...rest} render={render} />);
}

export default ProtectedRoute;