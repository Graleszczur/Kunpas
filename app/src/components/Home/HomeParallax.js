import React, {Component} from 'react';
import {Slide, Slider, Caption} from 'react-materialize'

export class HomeParallax extends Component {

    render() {

        return (
            <Slider>
                <Slide image={'https://i.imgur.com/OvK2QNR.jpg'}>
                    <Caption>
                        <h3>
                            This is our big Tagline!
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                            Here's our small slogan.
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={'https://i.imgur.com/OvK2QNR.jpg'}>
                    <Caption placement="left">
                        <h3>
                            Left Aligned Caption
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                            Here's our small slogan.
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={'https://i.imgur.com/OvK2QNR.jpg'}>
                    <Caption placement="right">
                        <h3>
                            Right Aligned Caption
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                            Here's our small slogan.
                        </h5>
                    </Caption>
                </Slide>
                <Slide image={'https://i.imgur.com/OvK2QNR.jpg'}>
                    <Caption>
                        <h3>
                            This is our big Tagline!
                        </h3>
                        <h5 className="light grey-text text-lighten-3">
                            Here's our small slogan.
                        </h5>
                    </Caption>
                </Slide>
            </Slider>
        );
    }
}
export default HomeParallax;
