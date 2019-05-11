import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import renderLogin from './pages/renderLogin'
import NotFound from './pages/404'
import Home from './pages/Home'

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={renderLogin}/>
              <Route exact path="/404" component={NotFound} />
              <Redirect to="/404" />
          </Switch>
      </Router>
  );
}

export default App;
