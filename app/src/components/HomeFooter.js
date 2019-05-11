import React, {Component} from 'react';
import {Footer} from 'react-materialize'


export class HomeFooter extends Component {
    render() {
        return (
            <React.Fragment>
                <Footer className="grey">
                    <p className="grey-text text-lighten-4">Made with Materialize</p>
                </Footer>
            </React.Fragment>
        );
    }
}
export default HomeFooter;