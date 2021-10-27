import { CircularProgress } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import RedirectableRoute from './components/redirectable/redirectable-route.component';
import ProtectedRoute from './components/routes/protected-route.component';

const Login = lazy(() => import('./pages/login/login.component'));
const Registration = lazy(() => import('./pages/sign-up/registration.component'));
const ChatApp = lazy(() => import('./components/chat-app/chat-app.component'));

const App: React.FC = () => {

  return (
    <div>
      <Switch>
        <Suspense fallback={<CircularProgress />}>
          <RedirectableRoute exact path='/' component={Login} redirectTo='/chat-app' />
          <RedirectableRoute exact path='/signin' component={Login} redirectTo='/chat-app'/>
          {/* <RedirectableRoute exact path='/signup' component={Registration} redirectTo='/chat-app'/>
          <ProtectedRoute exact path='/chat-app' component={ChatApp} /> */}
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
