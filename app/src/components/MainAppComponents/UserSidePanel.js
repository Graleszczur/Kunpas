import React, {Component} from 'react';
import {SideNav, SideNavItem} from 'react-materialize'

export class UserSidePanel extends Component {
    render() {
        return (
            <SideNav>
                <SideNavItem userView user={{
                    background: 'https://i.imgur.com/M7rr0PP.jpg',
                    image: 'https://i.imgur.com/YBg8z1N.jpg',
                    name: 'Bartosz Gralewski'
                }} />
                <SideNavItem href="/app/projects-list" icon="content_paste">
                    Projects
                </SideNavItem>
                <SideNavItem divider />
                <SideNavItem waves href={"/logout"} icon="build">
                    Logout
                </SideNavItem>
            </SideNav>

        );
    }
}
export default UserSidePanel;