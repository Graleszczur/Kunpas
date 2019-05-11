import React, {Component} from 'react';
import {SideNav, SideNavItem} from 'react-materialize'

export class UserSidePanel extends Component {
    render() {
        return (
            <SideNav>
                <SideNavItem userView user={{
                    background: 'https://placeimg.com/640/480/tech',
                    image: 'https://i.imgur.com/MVdkcM6.png',
                    name: 'Bartosz Gralewski'
                }} />
                <SideNavItem href="/" icon="content_paste">
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