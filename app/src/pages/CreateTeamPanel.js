import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import CreateTeam from '../components/TeamPanel/CreateTeam'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


const CREATE_TEAM = gql`
  mutation($projectId: Int!, $name: String!){
    createTeam(name: $name, projectId: $projectId){
      ok
      team{
        projectId
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
                    <Mutation mutation={CREATE_TEAM}>
                        {(createTeam, { data }) => <CreateTeam mutate={createTeam} /> }
                    </Mutation>
                </div>
            </div>
        );
    }
}
export default CreateTeamPanel;
