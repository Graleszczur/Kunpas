import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import CreateTask from '../components/TaskPanel/CreateTask'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'


const CREATE_TASK = gql`
  mutation($description: String, $name: String!, $eta: Date!, $teamId: Int!){
    createTask(description: $description, name: $name, eta: $eta, teamId: $teamId){
      task{
        id
      }
    }
  }
`

export class CreateTaskPanel extends Component {
  constructor(props) {
      super(props);
      var url = new URL(window.location.href);
      var c = url.searchParams.get("objectId");
      this.state = {
          teamId: c
      };
  }
    render() {
        return (
            <div>
                <UserSidePanel/>
                <div style={{textAlign: 'center', marginLeft: "27%"}}>
                    <Mutation mutation={CREATE_TASK}>
                        {(createTask, { data }) => <CreateTask mutate={createTask} taskId={this.state.teamId} /> }
                    </Mutation>
                </div>
            </div>
        );
    }
}
export default CreateTaskPanel;
