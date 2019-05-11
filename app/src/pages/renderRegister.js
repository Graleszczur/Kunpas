import React from 'react';
import Register from '../components/Register'
import { Mutation } from 'react-apollo'
import HomeFooter from "../components/HomeFooter";
import HomeAppBar from "../components/HomeAppBar";
import gql from 'graphql-tag'

const REGISTER_USER = gql`
  mutation CreateUser($username: String!, $password: String!, $email: String!){
    createUser(username: $username, password: $password, email: $email){
      error
    }
  }
`

function renderLogin() {
    return (
      <div>
        <HomeAppBar/>
        <div style={{textAlign: 'center'}}>
            <Mutation mutation={REGISTER_USER}>
                {(register, { data }) => <Register mutate={register} /> }
            </Mutation>
        </div>
        <HomeFooter/>
      </div>
    );
}

export default renderLogin;
