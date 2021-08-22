import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/login-page/login-page.component';
import Registration from './pages/registration/registration.component';

const App: React.FC = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path='/signup' component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
