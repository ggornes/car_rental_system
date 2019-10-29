import React, {Component} from "react";

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicle: {
                make:'',
                model:'',
                year:'',
                rego: '',
                fuel: '',
                tank_size: '',
                initials: '',
            }
        };
    }

}

export default Details;