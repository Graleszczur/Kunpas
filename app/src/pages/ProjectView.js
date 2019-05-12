import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import TeamAddButton from "../components/TeamPanel/TeamAddButton"



export class ProjectView extends Component {
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Teams'}/>
                <UserSidePanel/>
                <ContentTable title={'Team'} description={'Team description'} dir={'/app/team-tasks'}/>
                <TeamAddButton/>
            </React.Fragment>
        );
    }
}
export default ProjectView;