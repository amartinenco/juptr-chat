import { CircularProgress } from '@material-ui/core';
import React, { Suspense, lazy, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './components/routes/protected-route.component';
import { checkUserSession } from './contexts/auth.actions';
import { AuthProvider, useAuthDispatch, useAuthState } from './contexts/auth.context';

const Login = lazy(() => import('./pages/login/login.component'));
const Registration = lazy(() => import('./pages/sign-up/registration.component'));
const ChatApp = lazy(() => import('./components/chat-app/chat-app.component'));

const App: React.FC = () => {
  
  return (
    <div>
      <Switch>
        <Suspense fallback={<CircularProgress />}>
          <AuthProvider>
            <Route exact path='/' component={Login} />
            <Route exact path='/signin' component={Login} />
            <Route exact path='/signup' component={Registration} />
            <ProtectedRoute exact path='/chat-app' component={ChatApp} />
          </AuthProvider>
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
