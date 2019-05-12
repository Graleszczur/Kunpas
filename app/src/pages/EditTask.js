import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import {Row, Col, TextInput, Button, Icon} from 'react-materialize'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import {client} from '../index'


const TASK_QUERY = gql`
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

const EDIT_TASK = gql`
  mutation($description: String, $name: String!, $eta: Date!, $taskId: Int!){
    editTask(description: $description, name: $name, eta: $eta, taskId: $taskId){
      task{
        id
      }
    }
  }
`

export class EditTask extends Component {
    constructor(props) {
        super(props);
        var url = new URL(window.location.href);
        var c = url.searchParams.get("objectId");
        this.state = {
          status: "",
          name: "",
          eta: "",
          description: "",
          taskId: c,
        }

    }
    componentDidMount(props) {
        var url = new URL(window.location.href);
        var c = url.searchParams.get("objectId");
        client.query({
          query: TASK_QUERY,
          variables: {id: this.state.taskId}
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

    handleSubmit = event => {
        event.preventDefault();
        this.props.mutate({
            variables: {description: this.state.description, name: this.state.name, eta: this.state.eta, teamId: this.state.teamId}
        }).then(function(data) {
            window.location.href = '/app/task';
        }).catch(function(err) {
            alert(err);
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    render() {
        const styles = {
            search: {
                marginLeft: '50%'
            }
        };

        return (
           <React.Fragment>
               <div style={styles.search}>
                   <h2 className="header">Edit the task</h2>
               </div>
               <UserSidePanel/>
               <div>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput value={this.state.name} label='Name' id='name' onChange={this.handleChange} />
                       </Col>
                   </Row>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput value={this.state.description} label='Description' id='description' onChange={this.handleChange}/>
                       </Col>
                   </Row>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput  value={this.state.eta} label='Deadline' id='eta' onChange={this.handleChange}/>
                       </Col>
                   </Row>
               </div>
               <Row>
                   <br/>
                   <br/>
                   <Col offset={'l10'}>
                   <Mutation mutation={EDIT_TASK}>
                     {(update, { data }) => (
                       <Button type="submit" waves="light" onClick={e => {
                         e.preventDefault();
                         const id = this.state.id
                         update({ variables: {
                            name: this.state.name,
                            description: this.state.description,
                            eta: this.state.eta,
                            taskId: id
                          }}).then(function(data) {
                              window.location.href = '/app/task?objectId=' + id;
                          });
                       }}>
                       Submit
                       <Icon right>
                           send
                       </Icon>
                   </Button>
                     )}
                   </Mutation>
                   </Col>
               </Row>

           </React.Fragment>
        );
    }
}
export default EditTask;
