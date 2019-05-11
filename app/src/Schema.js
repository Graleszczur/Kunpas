import gql from 'graphql-tag';


const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!){
    tokenAuth(username: $username, password: $password){
      token
    }
  }
`
export default LOGIN_USER
