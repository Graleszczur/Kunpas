import React, {Component} from 'react';

export class AppTitleBar extends Component {
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
                <h2 className="header">{this.props.name}</h2>
                <br/>
            </div>

        );
    }
}
export default AppTitleBar;