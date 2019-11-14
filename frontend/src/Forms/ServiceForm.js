import React, { Component } from 'react';
import {addFuelPurchase, addNewRental, addService} from "../VehicleFunctions";

class FuelPurchaseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            service: {
                vehicle_id: this.props.vehicleId,
                odometer: '',
                serviced_at: ''
            }
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
        return(

            <form id="newServiceForm" onSubmit={this.onSubmit}>
                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="odometer" value={this.state.service.odometer} onChange={this.onChange} placeholder="Odometer"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="serviced_at" value={this.state.service.serviced_at} onChange={this.onChange} placeholder="Date of Service"/>
                    </div>

                </div>



            </form>

        );
    }

}

export default FuelPurchaseForm;
