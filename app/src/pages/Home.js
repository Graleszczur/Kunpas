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
                    <Parallax image={<img src={"https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_960_720.jpg"} alt={"maciek"}/>} />
                    <div className="section white">
                        <div className="row container">
                            <h2 className="header">
                                Parallax
                            </h2>
                            <p className="grey-text text-darken-3 lighten-3">
                                Parallax is an effect where the background content or image in this case, is moved at a different speed than the foreground content while scrolling.
                            </p>
                        </div>
                    </div>
                    <Parallax image={<img src={"https://cdn.pixabay.com/photo/2017/04/09/09/56/avenue-2215317_960_720.jpg"} alt={"maciek"} />} />
                </div>
                <HomeFooter/>
            </React.Fragment>

        );
    }
}
export default Home;