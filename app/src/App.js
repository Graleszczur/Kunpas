import React from 'react';
import Login from './components/Login'
import LOGIN_USER from "./Schema"
import { Mutation } from 'react-apollo'


function App() {
  return (
    <div className="App">
    {localStorage.getItem('token') === null &&
          <Mutation mutation={LOGIN_USER}>
            {(login, { data }) => <Login mutate={login} /> }
          </Mutation>
    }
    </div>
  );
}

export default App;
