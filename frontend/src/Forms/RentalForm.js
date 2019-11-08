import React, { Component } from 'react';
import {addNewRental} from "../VehicleFunctions";

class RentalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rental: {
                vehicle_id: '',
                odometer_start: '',
                odometer_end: '',
                date_start: '',
                date_end: '',
                rental_type: ''
            }
        };
    }

    onChange = (e) => {

        const state = this.state;
        state.rental[e.target.name] = e.target.value;
        this.setState(state);

    };

    onSubmit = (e) => {

        // ToDo: Validate fields
        // if field is empty, var = default;


        e.preventDefault();
        console.log(this.state.rental);

        addNewRental(this.state.rental).then(() => {
            console.log("added new rental");

        });
    };

    render() {
        return(

            <form id="newRentalForm" onSubmit={this.onSubmit}>
                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="vehicle_id" value={this.state.rental.vehicle_id} onChange={this.onChange} placeholder="Vehicle Id"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="odometer_start" value={this.state.rental.odometer_start} onChange={this.onChange} placeholder="Odometer Start"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="odometer_end" value={this.state.rental.odometer_end} onChange={this.onChange} placeholder="Odometer End"/>
                    </div>

                </div>

                <div><br/></div>

                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="date_start" value={this.state.rental.date_start} onChange={this.onChange} placeholder="Start Date"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="date_end" value={this.state.rental.date_end} onChange={this.onChange} placeholder="End Date"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="rental_type" value={this.state.rental.rental_type} onChange={this.onChange} placeholder="Rental Type"/>
                    </div>

                </div>


            </form>

        );
    }

}

export default RentalForm;
