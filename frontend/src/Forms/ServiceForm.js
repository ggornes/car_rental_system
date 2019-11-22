import React, { Component } from 'react';
import {addFuelPurchase, addNewRental, addService} from "../VehicleFunctions";
import {Redirect} from "react-router-dom";
import {MDBCol, MDBRow} from "mdbreact";
import {Formik} from "formik";
import * as Yup from "yup";

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

        const validationSchema = Yup.object().shape({
            odometer: Yup.number().min(1, "Must be greater than 0").required("Must enter a value")
        });

        return(

            <Formik
                initialValues={{odometer: "", serviced_at: ""}}
                validationSchema={validationSchema}
            >
                {({values, errors, touched, handleChange, handleBlur, isValid}) => (
                    <form id="newServiceForm" onSubmit={this.onSubmit}>
                        {JSON.stringify(values)}
                        <MDBRow>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Odometer </label>
                                <input className={touched.odometer && errors.odometer ? "form-control is-invalid" : "form-control"} type="number" pattern="[0-9]*" name="odometer" value={values.odometer} onChange={handleChange} onBlur={handleBlur} placeholder="Odometer"/>
                            </MDBCol>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Date of service </label>
                                <input type="date" className="form-group" name="serviced_at" value={values.serviced_at} onChange={handleChange} onBlur={handleBlur} placeholder="Date of Service"/>
                            </MDBCol>
                        </MDBRow>
                    </form>
                )}
            </Formik>


        );
    }

}

export default FuelPurchaseForm;
