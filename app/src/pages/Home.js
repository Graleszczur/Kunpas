import React, {Component} from 'react';
import HomeFooter from "../components/HomeFooter";
import HomeAppBar from "../components/HomeAppBar"
import HomeParallax from "../components/HomeParallax"
import {Parallax} from "react-materialize";

export class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <HomeAppBar/>
                <div>
                    <div className="section white">
                        <div className="row container">
                            <h2 className="header">
                                Hello
                            </h2>
                            <p className="grey-text text-darken-3 lighten-3">
                                Make project life easier!
                            </p>
                        </div>
                    </div>
                </div>
                <HomeFooter/>
            </React.Fragment>

        );
    }
}
export default Home;
