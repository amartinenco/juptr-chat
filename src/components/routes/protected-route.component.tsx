import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
import { RootState } from "../../redux/store";

const ProtectedRoute = ({ component, ...rest }: RouteProps) => {
  
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

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