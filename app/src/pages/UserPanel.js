import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import UserSearchBar from "../components/MainAppComponents/UserSearchBar";
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import UserProjectAddButton from "../components/ProjectPanel/UserProjectAddButton";



export class UserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Projects'}/>
                <UserSearchBar/>
                <UserSidePanel/>
                <ContentTable title={'Project'} description={'How to projects'} dir={'/app/project-teams'}/>
                <UserProjectAddButton/>
            </React.Fragment>

        );
    }
}
export default UserPanel;