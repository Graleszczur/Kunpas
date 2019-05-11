import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import CreateProject from '../components/TeamPanel/CreateTeam'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


const CREATE_PROJECT = gql`
  mutation($description: String, $name: String!){
    createProject(description: $description, name: $name){
      project{
        id
      }
    }
  }
`

export class CreateTeamPanel extends Component {
    render() {
        return (
            <div>
                <UserSidePanel/>
                <div style={{textAlign: 'center', marginLeft: "27%"}}>
                    <Mutation mutation={CREATE_PROJECT}>
                        {(createProject, { data }) => <CreateProject mutate={createProject} /> }
                    </Mutation>
                </div>
            </div>
        );
    }
}
export default CreateTeamPanel;
