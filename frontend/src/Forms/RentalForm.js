import React, { Component } from 'react';
import {addNewRental} from "../VehicleFunctions";
import {MDBCol, MDBRow} from "mdbreact";

class RentalForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rental: {
                vehicle_id: this.props.vehicleId,
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


                <MDBRow>
                    <MDBCol md="6" className="mb-3">
                        <label className="grey-text"> Odometer Start </label>
                        <input type="number" pattern="[0-9]*" className="form-control" name="odometer_start" value={this.state.rental.odometer_start} onChange={this.onChange} placeholder="Odometer Start" required/>
                    </MDBCol>
                    <MDBCol md="6" className="mb-3">
                        <label className="grey-text"> Odometer End </label>
                        <input type="number" pattern="[0-9]*" className="form-control" name="odometer_end" value={this.state.rental.odometer_end} onChange={this.onChange} placeholder="Odometer End" required/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Date Start </label>
                        <input type="date" className="form-control" name="date_start" value={this.state.rental.date_start} onChange={this.onChange} placeholder="Start Date" required/>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Date End </label>
                        <input type="date" className="form-control" name="date_end" value={this.state.rental.date_end} onChange={this.onChange} placeholder="End Date" required/>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Rental Type </label>
                        <select className="browser-default custom-select" name="rental_type" value={this.state.rental.rental_type} onChange={this.onChange} required>
                            <option>Rental Type</option>
                            <option value="D">D</option>
                            <option value="K">K</option>
                        </select>
                    </MDBCol>
                </MDBRow>








            </form>

        );
    }

}

export default RentalForm;
