import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import TaskAddButton from '../components/TaskPanel/TaskAddButton'
import TaskFooter from '../components/TaskPanel/TaskFooter'
import TaskInfo from "../components/TaskPanel/TaskInfo";
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import {client} from '../index'

const SWITCH_STATUS_MUTATION = gql`
  mutation SwitchStatus($taskId: Int!){
    switchStatus(taskId: $taskId){
      status
    }
  }
`


const PROJECTS_QUERY = gql`
  query Task($id: Int!){
    task(id: $id){
      id
      name
      description
      eta
      status
    }
  }
`

export class Task extends Component {
    constructor() {
      super()
      this.state = {
        status: "",
        name: "",
        eta: "",
        description: ""
      }
    }

    componentDidMount(props) {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("objectId");
        client.query({
          query: PROJECTS_QUERY,
          variables: {id: c}
        }).then(response =>{
          this.setState({
                status: response.data.task.status,
                name: response.data.task.name,
                eta: response.data.task.eta,
                description: response.data.task.description,
                id: response.data.task.id

            });

        })
    }

    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Task'}/>
                <UserSidePanel/>
                <TaskInfo data={this.state}/>
                <Mutation mutation={SWITCH_STATUS_MUTATION}>
                    {(register, { data }) => <TaskFooter data={this.state} swaper={this.swapStatus} mutate={register}/> }
                </Mutation>

            </React.Fragment>
        );
    }
}
export default Task;
