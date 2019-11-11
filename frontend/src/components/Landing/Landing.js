import React, {Component} from 'react';
import {Circle, WaveLoading} from "styled-spinkit";
import {Helmet} from 'react-helmet';



class Landing extends Component {
    constructor(props) {
        super(props);



    }

    componentDidMount() {
    }

    render() {

        return(
            <div>
                <Helmet>
                    <script src="/../.scriptInside.js"></script>


                </Helmet>
                <h1>Landing Page</h1>
                <canvas id="canvas">

                </canvas>
                <Circle color="blue"
                        size="80"
                />
                <WaveLoading size="80"/>
            </div>
        )
    }





}

export default Landing;







