import React, {Component} from 'react';
import HomeFooter from "../components/HomeFooter";
import HomeAppBar from "../components/HomeAppBar"
import HomeParallax from "../components/HomeParallax"

export class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <HomeAppBar/>
                <HomeParallax/>
                <HomeFooter/>
            </React.Fragment>

        );
    }
}
export default Home;