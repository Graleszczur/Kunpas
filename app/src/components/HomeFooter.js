import React, {Component} from 'react';
import {Footer} from 'react-materialize'


export class HomeFooter extends Component {
    render() {
      const stylesFooter = {
        position: "fixed",
        height: "50px",
        bottom: "0px",
        left: "0px",
        right: "0px",
        marginBottom: "0px"
      }
        return (
            <React.Fragment>
                <Footer style={stylesFooter} className="grey">
                </Footer>

            </React.Fragment>
        );
    }
}
export default HomeFooter;
