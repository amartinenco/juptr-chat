import React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";
// import { useAuthState } from "../../contexts/auth.context";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/store";

interface Props extends RouteProps {
  redirectTo: string;
}
const RedirectableRoute = ({ component, redirectTo, ...rest }: Props) => {


  const user = useSelector((state : RootState) => state.user.user);
  const loading = useSelector((state : RootState) => state.user.loading);

  // console.log(user);
  // console.log(loading);
	// const { loading, user } = useAuthState();

  if (!component) {
    throw Error("component is undefined");
  }

  const Component = component;

  const render = (props: RouteComponentProps<any>): React.ReactNode => {
    if (user?.displayName && user?.id && !loading) {  
      return <Redirect to={{ pathname: redirectTo }} />
    } else {
      return <Component {...props} />;
    }
  };
  
  return (<Route {...rest} render={render} />);
}

export default RedirectableRoute;