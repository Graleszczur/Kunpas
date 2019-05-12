import React, {Component} from 'react';
import {Navbar, Icon, NavItem, TextInput} from 'react-materialize'

export class UserSearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      project: ""
    };
  }
  handleChange = event => {
    this.props.handleQuery(event.target.value)
  }

    render() {
        const styles = {
            search: {
                marginLeft: '35%',
                marginRight: '20%',
            },

        }
        return (
                <div style={styles.search} >
                    <Navbar className={'grey'} style={{ borderRadius: "25px"}}  brand={<a />} alignLinks="left">
                        <Icon>search</Icon>
                            <TextInput
                                noLayout = {true}
                                id="project"
                                onChange={this.handleChange}
                            />


                    </Navbar>
                </div>
        );
    }
}
export default UserSearchBar;
