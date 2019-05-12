import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import UserSearchBar from "../components/MainAppComponents/UserSearchBar";
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import ContentTable from "../components/MainAppComponents/ContentTable";
import TaskAddButton from "../components/TaskPanel/TaskAddButton";




export class TeamTasks extends Component {
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Tasks'}/>
                <UserSearchBar/>
                <UserSidePanel/>
                <ContentTable title={'Task'} description={'very very hard'} dir={'/app/task'}/>
                <TaskAddButton/>
            </React.Fragment>

        );
    }
}
export default TeamTasks;