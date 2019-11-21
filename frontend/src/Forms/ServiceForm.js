import React, { Component } from 'react';
import {addFuelPurchase, addNewRental, addService} from "../VehicleFunctions";
import {Redirect} from "react-router-dom";
import {MDBCol, MDBRow} from "mdbreact";

class FuelPurchaseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service: {
                vehicle_id: this.props.vehicleId,
                odometer: '',
                serviced_at: ''
            },
            toDetails: false,
        };
    }



    onChange = (e) => {

        const state = this.state;
        state.service[e.target.name] = e.target.value;
        this.setState(state);

    };

    onSubmit = (e) => {

        // ToDo: Validate fields
        // if field is empty, var = default;


        e.preventDefault();
        console.log(this.state.service);

        addService(this.state.service).then(() => {
            console.log("added new fuel purchase");

        });
    };

    render() {
        if (this.state.toDetails === true) {
            return <Redirect to={`/details2/${this.props.vehicleId}`} />
        }
        return(

            <form id="newServiceForm" onSubmit={this.onSubmit}>
                <MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <label className="grey-text"> Odometer </label>
                        <input type="number" pattern="[0-9]*" className="form-control" name="odometer" value={this.state.service.odometer} onChange={this.onChange} placeholder="Odometer"/>
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                        <label className="grey-text"> Date of service </label>
                        <input type="date" className="form-control" name="serviced_at" value={this.state.service.serviced_at} onChange={this.onChange} placeholder="Date of Service"/>
                    </MDBCol>
                </MDBRow>
            </form>

        );
    }

}

export default FuelPurchaseForm;
