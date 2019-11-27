import React, { Component } from 'react';
import {fuelPurchase_add} from "../VehicleFunctions";
import {MDBCol, MDBRow} from "mdbreact";
import {Formik} from "formik";
import * as Yup from "yup";
import Error from "./Error"
import {FuelPurchase} from "../Models/FuelPurchase";

class FuelPurchaseForm extends Component {
// Note: we can use a stateless component now that we are using the Models
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

    onSubmit = (values) => {
        /*
        const state = this.state;
        state.fuel_purchase.amount = values.amount;
        state.fuel_purchase.cost = values.cost;
        this.setState(state);
         */

        const fuelPurchase = new FuelPurchase(this.props.vehicleId, this.props.rentalId, values.amount, values.cost);
        console.log("Model: ", fuelPurchase);

        //console.log(this.state.fuel_purchase);

        fuelPurchase_add(fuelPurchase).then(() => {
            console.log("added new fuel purchase");

        });


    };

    render() {

        const validationSchema = Yup.object().shape({
            amount: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            cost: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
        });

        return(


            <Formik
                initialValues={{amount: "", cost: ""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    this.onSubmit(values)
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                    <form id="newFuelPurchaseForm" onSubmit={handleSubmit}>
                        <MDBRow>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Rental Id </label>
                                <input type="text" className="form-control" name="rental_id" value={this.state.fuel_purchase.rental_id} onChange={this.onChange} placeholder="Rental Id"/>

                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Amount </label>
                                <input type="text" className={touched.amount && errors.amount ? "form-control is-invalid" : "form-control"} name="amount" value={values.amount} onChange={handleChange} onBlur={handleBlur} placeholder="Amount"/>
                                <Error touched={touched.amount} message={errors.amount}/>
                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Cost </label>
                                <input type="text" className={touched.cost && errors.cost ? "form-control is-invalid" : "form-control"} name="cost" value={values.cost} onChange={handleChange} onBlur={handleBlur} placeholder="Cost"/>
                                <Error touched={touched.cost} message={errors.cost}/>
                            </MDBCol>
                        </MDBRow>
                    </form>
                )}

            </Formik>



        );
    }

}

export default FuelPurchaseForm;
