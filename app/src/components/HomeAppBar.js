import React, {Component} from 'react';
import {Navbar, NavItem} from 'react-materialize'
import {Link} from "react-router-dom";

export class HomeAppBar extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar className={'grey'} alignLinks="right">
                    <Link to="/">
                        <NavItem>
                            Home
                        </NavItem>
                    </Link>
                    <Link to="/login">
                        <NavItem>
                            Login
                        </NavItem>
                    </Link>
                    <Link to="/login">
                        <NavItem>
                            Register
                        </NavItem>
                    </Link>
                </Navbar>
            </React.Fragment>

        );
    }
}
export default HomeAppBar;