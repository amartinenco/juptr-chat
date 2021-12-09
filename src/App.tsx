import { CircularProgress } from '@material-ui/core';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import RedirectableRoute from './components/redirectable/redirectable-route.component';
import ProtectedRoute from './components/routes/protected-route.component';
import GlobalStyles from './global.styles';
import { checkUserSessionStart } from './redux/auth/auth.actions';

const Login = lazy(() => import('./pages/login/login.component'));
const Registration = lazy(() => import('./pages/sign-up/registration.component'));
const Chat = lazy(() => import('./pages/chat/chat.component'));

const App: React.FC = () => {

  const dispatch = useDispatch();

  const theme = createTheme({
    // palette: {
    //   primary: {
    //     main: '#nnn'
    //   }
    // }
  });

  // useEffect(()=>{
  //   let sessionInterval = setInterval(() => {
  //     dispatch(checkUserSessionStart());
  //     },
  //     1000
  //   );

  //   return () => {
  //     clearInterval(sessionInterval);
  //   }
  // },[dispatch]);

  useEffect(()=>{
    dispatch(checkUserSessionStart());
  },[dispatch]);
  
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <GlobalStyles />
        <Switch>
          <Suspense fallback={<CircularProgress />}>
            <RedirectableRoute exact path='/' component={Login} redirectTo='/chat-app' />
            <RedirectableRoute exact path='/signin' component={Login} redirectTo='/chat-app'/>
            <RedirectableRoute exact path='/signup' component={Registration} redirectTo='/chat-app'/>
            <ProtectedRoute exact path='/chat-app' component={Chat} />
          </Suspense>
        </Switch>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
