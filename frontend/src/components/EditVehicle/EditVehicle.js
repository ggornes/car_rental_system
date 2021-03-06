import React, {Component} from 'react';
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import EditVehicleForm from "../../Forms/EditVehicleForm";


class EditVehicle extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            vehicle: {
                id: '',
                make:'a',
                model:'b',
                release_year:'',
                registration: '',
                fuel: '',
                tank_size: '',
                initials: '',
            }
        };


    };

    componentDidMount() {
        const { vehicleId } = this.props.match.params;
        console.log("vehicleId:", vehicleId);

        const API = 'http://127.0.0.1:5000/vehicles/show/' + `${vehicleId}`;

        fetch(API)
            .then(response => response.json())

            .then(data => this.setState(
                {
                    vehicle: data[0],
                    isLoaded: true,
                }
                )
            )
    };

    render() {

        return(
            <div className="container">
                <h4>
                    Edit Vehicle
                </h4>
                {this.state.isLoaded ?
                    (
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <h1>
                                        {this.state.vehicle.make + ' ' + this.state.vehicle.model + ' ' + this.state.vehicle.release_year}
                                    </h1>
                                    <EditVehicleForm item={this.state.vehicle}/>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    )
                    :
                    (
                        <div>
                            loading
                        </div>
                    )
                }

            </div>
        );
    };


}

export default EditVehicle;