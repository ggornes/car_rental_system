import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Link} from 'react-router-dom';
import {addNewRental, addToList, addToList2} from "../../VehicleFunctions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {VehicleFormErrors} from "../../Forms/VehicleFormErrors";
import * as Yup from "yup";
import {Formik} from "formik";
import Error from "../../Forms/Error";


class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                make:'',
                model:'',
                release_year:'',
                registration: '',
                fuel: '',
                tank_size: '',
                initials: '',
            },
            formErrors: {make: '', model: '', release_year: '', registration: '', tank_size: ''},
            makeValid: false,
            modelValid: false,
            yearValid: false,
            registrationValid: false,
            tank_sizeValid: false,
            formValid: false
        };


    }

/*
    onChange = (e) => {

        const state = this.state;
        const name = e.target.name;
        const value = e.target.value;

        state.vehicle[name] = value;
        this.setState(state, () => {this.validateField(name, value)});

    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let makeValid = this.state.makeValid;
        let modelValid = this.state.modelValid;
        let yearValid = this.state.yearValid;
        let registrationValid = this.state.registrationValid;
        let tank_sizeValid = this.state.tank_sizeValid;

        switch(fieldName) {
            case 'make':
                makeValid = value.length >= 3;
                fieldValidationErrors.make = makeValid ? '' : 'value is too short';
                break;
            case 'model':
                modelValid = value.length >= 1;
                fieldValidationErrors.model = modelValid ? '': ' is too short';
                break;
            case 'release_year':
                yearValid = value.length === 4;
                fieldValidationErrors.year = yearValid ? '': 'invalid year';
                break;
            case 'registration':
                registrationValid = value.length === 7;
                fieldValidationErrors.registration = registrationValid ? '': ' must be 7 characters';
                break;
            case 'tank_size':
                tank_sizeValid = value > 0;
                fieldValidationErrors.tank_size = tank_sizeValid ? '': ' must be greater than 0';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            makeValid: makeValid,
            modelValid: modelValid,
            yearValid: yearValid,
            registrationValid: registrationValid,
            tank_sizeValid: tank_sizeValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.makeValid && this.state.modelValid && this.state.yearValid && this.state.registrationValid && this.state.tank_sizeValid});
    }

    onSubmit = (e) => {

        e.preventDefault();
        //e.target.className += " was-validated";
        console.log(this.state.vehicle);


        addToList2(this.state.vehicle).then(() => {
            //this.getAll()
            // redirect
            // show success or error message
            this.props.history.push(`/browse`);
        })

    };
*/

    onSubmit = (values) => {
        const state = this.state;
        state.vehicle.make = values.make;
        state.vehicle.model = values.model;
        state.vehicle.release_year = values.release_year;
        state.vehicle.registration = values.registration;
        state.vehicle.fuel = values.fuel;
        state.vehicle.tank_size = values.tank_size;
        state.vehicle.initials = values.initials;
        this.setState(state);
        console.log(this.state.vehicle);

        addToList2(this.state.vehicle).then(() => {
            //this.getAll()
            // redirect
            // show success or error message
            this.props.history.push(`/browse`);
        })
    };

    onClear = (e) => {
        const vehicle = {
            make:'',
            model:'',
            release_year:'',
            registration: '',
            fuel: '',
            tank_size: '',
            initials: ''
        };
        const state = this.state;
        this.state.vehicle = vehicle;
        this.setState(state);


    };

    onCancel = () => {
        //console.log(this.props)
        this.props.history.push(`/browse`);
    };


    render() {

        const validationSchema = Yup.object().shape({
            make: Yup.string().min(2, "Value is too short").required("Must enter a value"),
            model: Yup.string().min(1, "Value is too short").required("Must enter a value"),
            release_year: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            registration: Yup.string().length(7, "Must be 7 characters").matches(/^[A-Za-z0-9]{7}$/, "Only numbers and letters").required("Must enter a value"),
            fuel: Yup.string().required("Must enter a value"),
            tank_size: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            initials: Yup.string().max(4, "Max 4 characters").required("Must enter a value"),
        });

        return(
            <div className="container">
                <h4>
                    Add Vehicle
                </h4>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">


                            <Formik
                                initialValues={{make: "", model: "", release_year: "", registration: "", fuel: "", tank_size: "", initials: ""}}
                                validationSchema={validationSchema}
                                onSubmit={(values) => {
                                    this.onSubmit(values)
                                }}
                            >

                                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                                    <form onSubmit={handleSubmit}>

                                        <MDBRow>
                                            <MDBCol md="5" className="mb-3">
                                                <label className="grey-text"> Make </label>
                                                <input type="text" className={touched.make && errors.make ? "form-control is-invalid" : "form-control"} name="make" value={values.make} onChange={handleChange} onBlur={handleBlur} placeholder="Make"/>
                                                <Error touched={touched.make} message={errors.make}/>
                                            </MDBCol>
                                            <MDBCol md="5" className="mb-3">
                                                <label className="grey-text"> Model </label>
                                                <input type="text" className={touched.model && errors.model ? "form-control is-invalid" : "form-control"} name="model" value={values.model} onChange={handleChange} onBlur={handleBlur} placeholder="Model"/>
                                                <Error touched={touched.model} message={errors.model}/>
                                            </MDBCol>
                                            <MDBCol md="2" className="mb-3">
                                                <label className="grey-text"> Year </label>
                                                <input type="number" pattern="[0-9]*" className={touched.release_year && errors.release_year ? "form-control is-invalid" : "form-control"} name="release_year" value={values.release_year} onChange={handleChange} onBlur={handleBlur} placeholder="Year"/>
                                                <Error touched={touched.release_year} message={errors.release_year}/>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol md="5" className="mb-3">
                                                <label className="grey-text"> Registration Number </label>
                                                <input type="text" className={touched.registration && errors.registration ? "form-control is-invalid" : "form-control"} name="registration" value={values.registration} onChange={handleChange} onBlur={handleBlur} placeholder="Registration Number"/>
                                                <Error touched={touched.registration} message={errors.registration}/>
                                            </MDBCol>
                                        </MDBRow>

                                        <MDBRow>
                                            <MDBCol md="4" className="mb-3">
                                                <label className="grey-text"> Fuel Type </label>
                                                <input type="text" className={touched.fuel && errors.fuel ? "form-control is-invalid" : "form-control"} name="fuel" value={values.fuel} onChange={handleChange} onBlur={handleBlur} placeholder="Fuel Type"/>
                                                <Error touched={touched.fuel} message={errors.fuel}/>
                                            </MDBCol>
                                            <MDBCol md="4" className="mb-3">
                                                <label className="grey-text"> Tank Size </label>
                                                <input type="number" pattern="[0-9]*" className={touched.tank_size && errors.tank_size ? "form-control is-invalid" : "form-control"} name="tank_size" value={values.tank_size} onChange={handleChange} onBlur={handleBlur} placeholder="Tank Size"/>
                                                <Error touched={touched.tank_size} message={errors.tank_size}/>
                                            </MDBCol>
                                            <MDBCol md="4" className="mb-3">
                                                <label className="grey-text"> Initials </label>
                                                <input type="text" className={touched.initials && errors.initials ? "form-control is-invalid" : "form-control"} name="initials" value={values.initials} onChange={handleChange} onBlur={handleBlur} placeholder="Initials"/>
                                                <Error touched={touched.initials} message={errors.initials}/>
                                            </MDBCol>
                                        </MDBRow>


                                        <div className="form-row">
                                            <MDBBtn type="submit" gradient="tempting-azure-gradient color-block-5" >Save</MDBBtn>
                                            <MDBBtn onClick={this.onClear} gradient="sunny-morning-gradient color-block-5">Clear</MDBBtn>
                                            <MDBBtn onClick={this.onCancel} outline color="danger">Cancel</MDBBtn>
                                        </div>

                                    </form>
                                )}
                            </Formik>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        );
    };


}

export default Add;