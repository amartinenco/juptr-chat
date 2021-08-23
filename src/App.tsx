import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/login/login.component';
import SignUp from './pages/sign-up/sign-up.component';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/signup' component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
