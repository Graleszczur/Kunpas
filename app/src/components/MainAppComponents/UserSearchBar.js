import React, {Component} from 'react';
import {Navbar, NavItem} from 'react-materialize'

export class UserSearchBar extends Component {
    render() {
        const styles = {
            search: {
                marginLeft: '35%',
                marginRight: '20%',
            },

        }
        return (
                <div style={styles.search}>
                    <Navbar className={'grey'} style={{ borderRadius: "25px"}}  brand={<a />} alignLinks="right" search>

                        <NavItem href="">
                            Getting started
                        </NavItem>
                        <NavItem href="components.html">
                            Components
                        </NavItem>

                    </Navbar>
                </div>
        );
    }
}
export default UserSearchBar;