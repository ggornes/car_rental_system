import React, { Component } from 'react';
import {addFuelPurchase, addNewRental} from "../VehicleFunctions";
import {MDBCol, MDBRow} from "mdbreact";

class FuelPurchaseForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fuel_purchase: {
                vehicle_id: this.props.vehicleId,
                rental_id: this.props.rentalId || '',
                amount: '',
                cost: ''
            }
        };
    }

    onChange = (e) => {

        const state = this.state;
        state.fuel_purchase[e.target.name] = e.target.value;
        this.setState(state);

    };

    onSubmit = (e) => {

        // ToDo: Validate fields
        // if field is empty, var = default;


        e.preventDefault();
        console.log(this.state.fuel_purchase);

        addFuelPurchase(this.state.fuel_purchase).then(() => {
            console.log("added new fuel purchase");

        });
    };

    render() {
        return(

            <form id="newFuelPurchaseForm" onSubmit={this.onSubmit}>
                <MDBRow>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Rental Id </label>
                        <input type="text" className="form-control" name="rental_id" value={this.state.fuel_purchase.rental_id} onChange={this.onChange} placeholder="Rental Id"/>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Amount </label>
                        <input type="text" className="form-control" name="amount" value={this.state.fuel_purchase.amount} onChange={this.onChange} placeholder="Amount"/>
                    </MDBCol>
                    <MDBCol md="4" className="mb-3">
                        <label className="grey-text"> Cost </label>
                        <input type="text" className="form-control" name="cost" value={this.state.fuel_purchase.cost} onChange={this.onChange} placeholder="Cost"/>
                    </MDBCol>
                </MDBRow>
            </form>

        );
    }

}

export default FuelPurchaseForm;
