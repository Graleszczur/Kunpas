import React, {Component} from 'react';
import HomeFooter from "../components/Home/HomeFooter";
import HomeAppBar from "../components/Home/HomeAppBar"

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
