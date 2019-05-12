import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'

export class GenerateGraphView extends Component {
    render() {
        const styles = {
            search: {
                marginLeft: '40%'
            }
        };
        return (
            <React.Fragment>
                <div style={styles.search}>
                    <h2 className="header">Generated hierarchy graph</h2>
                    <br/>
                </div>
                <UserSidePanel/>
            </React.Fragment>


        );
    }
}
export default GenerateGraphView;