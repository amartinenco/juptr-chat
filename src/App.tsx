import { CircularProgress } from '@material-ui/core';
import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

const Login = lazy(() => import('./pages/login/login.component'));
const Registration = lazy(() => import('./pages/sign-up/registration.component'));

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Suspense fallback={<CircularProgress />}>
          <Route exact path='/' component={Login} />
          <Route exact path='/signin' component={Login} />
          <Route exact path='/signup' component={Registration} />
        </Suspense>
      </Switch>
    </div>
  );
}

export default App;
