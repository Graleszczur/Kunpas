import React, {Component} from 'react';
import {SideNav, SideNavItem} from 'react-materialize'

export class UserSidePanel extends Component {
    render() {
        return (
            <SideNav>
                <SideNavItem userView user={{
                    background: 'https://i.imgur.com/HWbKDkW.jpg',
                    image: 'https://i.imgur.com/rOQS9LT.png',
                    name: 'John Biznes'
                }} />
                <SideNavItem href="/app/projects-list" icon="list">
                    Projects
                </SideNavItem>
                <SideNavItem href="/app/generate-graph" icon="content_paste">
                    Generate hierarchy graph
                </SideNavItem>
                <SideNavItem style={{marginTop: '130%'}} divider />
                <SideNavItem waves href={"/logout"} icon="build">
                    Logout
                </SideNavItem>
            </SideNav>

        );
    }
}
export default UserSidePanel;
