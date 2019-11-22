import React, { Component } from 'react';
import {addFuelPurchase, addNewRental} from "../VehicleFunctions";
import {MDBCol, MDBRow} from "mdbreact";
import * as Yup from "yup";
import {Formik} from "formik";
import Error from "./Error";

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
/*
    onSubmit = (e) => {

        e.preventDefault();
        console.log(this.state.rental);

        addNewRental(this.state.rental).then(() => {
            console.log("added new rental");

        });
    };
*/

    onSubmit = (values) => {
        const state = this.state;
        state.rental.odometer_start = values.odometer_start;
        state.rental.odometer_end = values.odometer_end;
        state.rental.date_start = values.date_start;
        state.rental.date_end = values.date_end;
        this.setState(state);
        console.log(this.state.rental);
        addNewRental(this.state.rental).then(() => {
            console.log("added new rental");

        });
    };


    render() {

        const validationSchema = Yup.object().shape({
            odometer_start: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            odometer_end: Yup.number().min(1, "Must be greater than 0").min(Yup.ref('odometer_start'), "Must be greater than odometer_start").required("Must enter a value"),
            date_start: Yup.date().required("Must enter a date"),
            date_end: Yup.date().min(Yup.ref('date_start'), "Must be greater than date_start").required("Must enter a date"),
            rental_type: Yup.string().required("Must choose one option")
        });

        return(

            <Formik
                initialValues={{odometer_start: "", odometer_end: "", date_start: "", date_end: ""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    this.onSubmit(values)
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                    <form id="newRentalForm" onSubmit={handleSubmit}>
                        <MDBRow>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Odometer Start </label>
                                <input type="number" pattern="[0-9]*" className={touched.odometer_start && errors.odometer_start ? "form-control is-invalid" : "form-control"} name="odometer_start" value={values.odometer_start} onChange={handleChange} onBlur={handleBlur} placeholder="Odometer Start"/>
                                <Error touched={touched.odometer_start} message={errors.odometer_start}/>
                            </MDBCol>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Odometer End </label>
                                <input type="number" pattern="[0-9]*" className={touched.odometer_end && errors.odometer_end ? "form-control is-invalid" : "form-control"} name="odometer_end" value={values.odometer_end} onChange={handleChange} onBlur={handleBlur} placeholder="Odometer End"/>
                                <Error touched={touched.odometer_end} message={errors.odometer_end}/>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Date Start </label>
                                <input type="date" className={touched.date_start && errors.date_start ? "form-control is-invalid" : "form-control"} name="date_start" value={values.date_start} onChange={handleChange} onBlur={handleBlur} placeholder="Start Date"/>
                                <Error touched={touched.date_start} message={errors.date_start}/>
                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Date End </label>
                                <input type="date" className={touched.date_end && errors.date_end ? "form-control is-invalid" : "form-control"} name="date_end" value={values.date_end} onChange={handleChange} onBlur={handleBlur} placeholder="Start Date"/>
                                <Error touched={touched.date_end} message={errors.date_end}/>
                            </MDBCol>
                            <MDBCol md="4" className="mb-3">
                                <label className="grey-text"> Rental Type </label>
                                <select className={touched.rental_type && errors.rental_type ? "browser-default custom-select is-invalid" : "browser-default custom-select"} name="rental_type" value={values.rental_type} onChange={handleChange} onBlur={handleBlur}>
                                    <option>Rental Type</option>
                                    <option value="D">D</option>
                                    <option value="K">K</option><Error touched={touched.rental_type} message={errors.rental_type}/>
                                </select>
                                <Error touched={touched.rental_type} message={errors.rental_type}/>
                            </MDBCol>
                        </MDBRow>
                    </form>
                )}
            </Formik>



        );
    }

}

export default RentalForm;
