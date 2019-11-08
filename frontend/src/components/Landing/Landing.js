import React, {Component} from 'react';
import {Circle, WaveLoading} from "styled-spinkit";



class Landing extends Component {
    constructor(props) {
        super(props);



    }

    componentDidMount() {
    }

    render() {

        return(
            <div>
                <h1>Landing Page</h1>
                <Circle color="blue"
                        size="80"
                />
                <WaveLoading size="80"/>
            </div>
        )
    }





}

export default Landing;







