import React, {Component} from 'react';

export class UserProjectBar extends Component {
    render() {
        const styles = {
            search: {
                marginLeft: '50%'
            },
            logo: {
                marginLeft: '20%'
            }
        }
        return (
            <div style={styles.search}>
                <h2 className="header">Projects</h2>
                <br/>
            </div>

        );
    }
}
export default UserProjectBar;