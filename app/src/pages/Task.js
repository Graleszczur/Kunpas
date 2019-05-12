import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import AppTitleBar from "../components/MainAppComponents/AppTitleBar";
import TaskFooter from '../components/TaskPanel/TaskFooter'
import TaskInfo from "../components/TaskPanel/TaskInfo";


export class Task extends Component {
    render() {
        return (
            <React.Fragment>
                <AppTitleBar name={'Task'}/>
                <UserSidePanel/>
                <TaskInfo/>
                <TaskFooter/>
            </React.Fragment>
        );
    }
}
export default Task;