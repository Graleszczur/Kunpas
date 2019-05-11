import React from 'react';
import Login from '../components/Login'
import { Mutation } from 'react-apollo'
import HomeFooter from "../components/HomeFooter";
import HomeAppBar from "../components/HomeAppBar"
import gql from 'graphql-tag'


const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
      token
    }
  }
`

function renderLogin() {
    return (
      <div>
        <HomeAppBar/>
        <div style={{textAlign: 'center'}}>
            <Mutation mutation={LOGIN_USER}>
                {(login, { data }) => <Login mutate={login} /> }
            </Mutation>
        </div>
        <HomeFooter/>
      </div>
    );
}

export default renderLogin;
