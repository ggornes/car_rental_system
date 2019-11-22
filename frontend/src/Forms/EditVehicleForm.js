import React, {Component} from 'react';
import {updateItem} from "../VehicleFunctions";
import {MDBBtn, MDBCol, MDBContainer, MDBRow} from "mdbreact";
import {Redirect} from "react-router-dom";
import * as Yup from "yup";
import {Formik} from "formik";
import Error from "./Error";


class EditVehicleForm extends Component {

    constructor(props) {
        super(props);


        this.state = {
            vehicle: {
                id: this.props.item.id,
                make:this.props.item.make,
                model:this.props.item.model,
                release_year:this.props.item.release_year,
                registration: this.props.item.registration,
                fuel: this.props.item.fuel,
                tank_size: this.props.item.tank_size,
                initials: this.props.item.initials,
            },
            toBrowse: false,
            formErrors: {make: '', model: '', release_year: '', registration: '', tank_size: ''},
            makeValid: true,
            modelValid: true,
            yearValid: true,
            registrationValid: true,
            tank_sizeValid: true,
            formValid: true
        };

    }

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

        updateItem(this.state.vehicle, this.state.vehicle.id).then(() => {
            this.setState({toBrowse : true});
        })
    };

    onCancel = () => {
        console.log(this.props);
        this.setState({toBrowse : true});
    };


    render() {
        if (this.state.toBrowse === true) {
            return <Redirect to='/browse' />
        }

        const validationSchema = Yup.object().shape({
            make: Yup.string().min(2, "Value is too short").required("Must enter a value"),
            model: Yup.string().min(1, "Value is too short").required("Must enter a value"),
            release_year: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            registration: Yup.string().length(7, "Must be 7 characters").matches(/^[A-Za-z0-9]{7}$/, "Only numbers and letters").required("Must enter a value"),
            fuel: Yup.string().required("Must enter a value"),
            tank_size: Yup.number().min(1, "Must be greater than 0").required("Must enter a value"),
            initials: Yup.string().max(4, "Max 4 characters").required("Must enter a value"),
        });


        return (
            <div>


                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">


                            <Formik
                                initialValues={{make: this.state.vehicle.make, model: this.state.vehicle.model, release_year: this.state.vehicle.release_year, registration: this.state.vehicle.registration, fuel: this.state.vehicle.fuel, tank_size: this.state.vehicle.tank_size, initials: this.state.vehicle.initials}}
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
    }

}

export default EditVehicleForm;
