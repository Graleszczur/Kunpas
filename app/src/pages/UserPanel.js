import React, {Component} from 'react';
import UserSidePanel from '../components/UserSidePanel'
import UserSearchBar from "../components/UserSearchBar";
import UserProjectBar from "../components/UserProjectBar";
import UserProjectsTable from "../components/UserProjectsTable";
import UserProjectAddButton from "../components/UserProjectAddButton";



export class UserPanel extends Component {
    render() {
        return (
            <React.Fragment>
                <UserProjectBar/>
                <UserSearchBar/>
                <UserSidePanel/>
                <UserProjectsTable/>
                <UserProjectAddButton/>
            </React.Fragment>

        );
    }
}
export default UserPanel;