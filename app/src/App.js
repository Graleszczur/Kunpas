import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from "react-router-dom";
import UserPanel from './pages/UserPanel'
import renderLogin from './pages/renderLogin'
import renderRegister from './pages/renderRegister'
import renderLogout from './pages/renderLogout'
import CreateProjectPanel from './pages/CreateProjectPanel'
import NotFound from './pages/404'
import Home from './pages/Home'


function App() {

  return (
      <Router>
          <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={renderLogin}/>
              <Route exact path="/logout" component={renderLogout}/>
              <Route exact path="/app" component={UserPanel}/>
              <Route exact path="/404" component={NotFound} />
              <Route exact path="/registration" component={renderRegister} />
              <Route exact path="/app/projects" component={UserPanel} />
              <Route exact path="/app/add-project" component={CreateProjectPanel} />
              <Redirect to="/404" />
          </Switch>
      </Router>
  );
}

export default App;
