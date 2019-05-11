import React, {Component} from 'react';
import {Footer} from 'react-materialize'


export class HomeFooter extends Component {
    render() {
        return (
            <React.Fragment>
                <Footer
                    copyrights="Made with Materialize"
                    className="page-footer grey"
                >
                </Footer>

            </React.Fragment>
        );
    }
}
export default HomeFooter;