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
import ProjectView from "./pages/ProjectView";
import CreateTeamPanel from "./pages/CreateTeamPanel"
import TeamTasks from "./pages/TeamTasks";
import CreateTaskPanel from "./pages/CreateTaskPanel";
import Task from './pages/Task'
import GenerateGraphView from "./pages/GenerateGraphView";
import EditTask from "./pages/EditTask";


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
              <Route exact path="/app/projects-list" component={UserPanel} />
              <Route exact path="/app/add-project" component={CreateProjectPanel} />
              <Route exact path="/app/add-team" component={CreateTeamPanel} />
              <Route exact path="/app/project-teams" component={ProjectView} />
              <Route exact path="/app/team-tasks" component={TeamTasks} />
              <Route exact path="/app/add-task" component={CreateTaskPanel} />
              <Route exact path="/app/task" component={Task} />
              <Route exact path="/app/generate-graph" component={GenerateGraphView} />
              <Route exact path="/app/task/edit" component={EditTask} />
              <Redirect to="/404" />
          </Switch>
      </Router>
  );
}

export default App;
