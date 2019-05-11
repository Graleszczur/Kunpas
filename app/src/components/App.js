import React from 'react';
import Login from './Login'
import LOGIN_USER from "../Schema"
import { Mutation } from 'react-apollo'
import { Footer } from 'react-materialize'

class App extends React.Component{

  render(){
    return (
        <div>
          {localStorage.getItem('token') === null &&
            <Mutation mutation={LOGIN_USER}>
              {(login, { data }) => <Login mutate={login} /> }
            </Mutation>
          }
        </div>
    )
  }
}

export default App;
