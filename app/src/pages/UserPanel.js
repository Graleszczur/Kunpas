import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import UserSearchBar from "../components/MainAppComponents/UserSearchBar";
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import AppListItem from "../components/MainAppComponents/AppListItem";
import UserProjectAddButton from "../components/ProjectPanel/UserProjectAddButton";
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {client} from '../index'


const PROJECTS_QUERY = gql`
  query Projects($text: String){
    projects(text: $text){
      id
      name
      description
    }
  }
`


export class UserPanel extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: null,
          query: "",
      };
  }

  handleQuery = (queryVal) => {
      this.setState({query: queryVal});
      client.query({
        query: PROJECTS_QUERY,
        variables: {text: this.state.query}
      }).then(response =>{
        this.setState({
          data: response.data.projects.map(project => <AppListItem key={project.id} title={project.name} description={project.description} dir={'/app/project-teams?objectId=' + project.id} />)
        });
      })
  }


  componentDidMount(){
    client.query({
      query: PROJECTS_QUERY,
      variables: {text: this.state.query}
    }).then(response =>{
      this.setState({
        data: response.data.projects.map(project => <AppListItem key={project.id} title={project.name} description={project.description} dir={'/app/project-teams?objectId=' + project.id} />)
      });
    })
  }

    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Projects'}/>
                <UserSearchBar handleQuery={this.handleQuery}/>
                <UserSidePanel/>
                <ContentTable title={'Project'} description={'How to projects'} objects={this.state.data} dir={'/app/project-teams'}/>
                <UserProjectAddButton/>
            </React.Fragment>

        );
    }
}
export default UserPanel;
