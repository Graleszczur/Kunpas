import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import TeamAddButton from "../components/TeamPanel/TeamAddButton"
import UserSearchBar from "../components/MainAppComponents/UserSearchBar";
import AppListItem from "../components/MainAppComponents/AppListItem";
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {client} from '../index'


const TEAM_QUERY = gql`
  query Teams($text: String, $projectId: String!){
    teams(text: $text, projectId: $projectId){
      id
      name
      description
    }
  }
`

export class ProjectView extends Component {
  constructor(props) {
      super(props);
      var url = new URL(window.location.href);
      var c = url.searchParams.get("objectId");
      this.state = {
          data: null,
          query: null,
          projectId: c,
      };

  }

  handleQuery = (queryVal) => {
      this.setState({query: queryVal});
      client.query({
        query: TEAM_QUERY,
        variables: {text: this.state.query, projectId: this.state.projectId}
      }).then(response =>{
        this.setState({
          data: response.data.teams.map(team => <AppListItem key={team.id} title={team.name} description={team.description} dir={'/app/project-teams?objectId=' + team.id} />)
        });
      })
  }


  componentDidMount(){
    client.query({
      query: TEAM_QUERY,
      variables: {projectId: this.state.projectId}
    }).then(response =>{
      this.setState({
        data: response.data.teams.map(team => <AppListItem key={team.id} title={team.name} description={team.description} dir={'/app/project-teams?objectId=' + team.id} />)
      });
    })
  }
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Teams'}/>
                <UserSearchBar handleQuery={this.handleQuery}/>
                <UserSidePanel/>
                <ContentTable title={'Team'} description={'Team description'} objects={this.state.data} dir={'/app/project'}/>
                <TeamAddButton projectId={this.state.projectId}/>
            </React.Fragment>
        );
    }
}
export default ProjectView;
