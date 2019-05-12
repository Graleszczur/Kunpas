import React, {Component} from 'react';
import HomeFooter from "../components/Home/HomeFooter";
import HomeAppBar from "../components/Home/HomeAppBar"
import {Button} from "react-materialize"

export class Home extends Component {
    center = {
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '100%',
        textAlign: 'center',
        fontSize: '18px'
    }
    render() {
        return (
            <React.Fragment>
                <HomeAppBar/>

                <div style={{position: 'relative'}}>
                    <img style={{width: '100%',height:'100%'}} src={'https://i.imgur.com/AZOJig1.jpg'} alt={'maciek'}/>
                    <div style={{position: 'absolute',
                        left: 0,
                        top: '30%',
                        width: '100%',
                        color: 'white',
                        textAlign: 'center',
                        textShadow: '2px 2px black',
                        fontSize: '60px'}}>
                        Make work easy again !
                    </div>
                    <div style={{position: 'absolute',
                        left: 0,
                        top: '45%',
                        width: '100%',
                        color: 'white',
                        textAlign: 'center',
                        fontSize: '60px'}}>
                        <Button
                            node="a"
                            waves="light"
                            large
                            style={{marginRight: '5px'}}
                            onClick ={() => window.location.href = '/registration'}
                        >
                            Sign in!
                        </Button>
                    </div>
                </div>




                <HomeFooter/>
            </React.Fragment>

        );
    }
}
export default Home;
