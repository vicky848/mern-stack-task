import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import SignupForm from './component/SignupForm';
import LocalStateComponent from './component/LocalStateComponent';
import CharactersTable from './component/CharactersTable';
import Home from './component/Home';
import Signin from './component/SignIn';


import ProtectedRoute from './routes/ProtectedRoute';


import { GlobalStateProvider } from './contexts/GlobalStateContext';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Switch>
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/signin" component={Signin} />
            <GlobalStateProvider>
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/local-state" component={LocalStateComponent} />
              <ProtectedRoute exact path="/characters" component={CharactersTable} />
            </GlobalStateProvider>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
