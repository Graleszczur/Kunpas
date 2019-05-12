import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import UserSearchBar from "../components/MainAppComponents/UserSearchBar";
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import TaskAddButton from "../components/TaskPanel/TaskAddButton";
import AppListItem from "../components/MainAppComponents/AppListItem";
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {client} from '../index'


const PROJECTS_QUERY = gql`
  query Tasks($text: String, $teamId: Int!){
    tasks(text: $text, teamId: $teamId){
      id
      name
      description
    }
  }
`



export class TeamTasks extends Component {
  constructor(props) {
      super(props);
      var url = new URL(window.location.href);
      var c = url.searchParams.get("objectId");
      this.state = {
          data: null,
          query: "",
          teamId: c,
      };
  }

  handleQuery = (queryVal) => {
      this.setState({query: queryVal});
      client.query({
        query: PROJECTS_QUERY,
        variables: {text: this.state.query, teamId: this.state.teamId}
      }).then(response =>{
        this.setState({
          data: response.data.tasks.map(team => <AppListItem key={team.id} title={team.name} description={team.description} dir={'/app/task?objectId=' + team.id} />)
        });
      })
  }


  componentDidMount(){
    client.query({
      query: PROJECTS_QUERY,
      variables: {text: this.state.query, teamId: this.state.teamId}
    }).then(response =>{
      this.setState({
        data: response.data.tasks.map(team => <AppListItem key={team.id} title={team.name} description={team.description} dir={'/app/task?objectId=' + team.id} />)
      });
    })
  }
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Tasks'}/>
                <UserSearchBar handleQuery={this.handleQuery}/>
                <UserSidePanel/>
                <ContentTable title={'Task'} description={'very very hard'} objects={this.state.data} dir={'/app/team-tasks'}/>
                <TaskAddButton objectId={this.state.teamId}/>
            </React.Fragment>

        );
    }
}
export default TeamTasks;
