import React, { Component } from 'react';
import {service_add} from "../VehicleFunctions";
import {MDBCol, MDBRow} from "mdbreact";
import {Formik} from "formik";
import * as Yup from "yup";
import Error from "./Error"
import {Service} from "./../Models/Service"

class ServiceForm extends Component {
// Note: we can use a stateless component now that we are using the Models
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



    onSubmit = (values) => {
        /*
        const state = this.state;
        state.service.odometer = values.odometer;
        state.service.serviced_at = values.serviced_at;
        this.setState(state);
         */
        const service = new Service(this.props.vehicleId, values.odometer, values.serviced_at);
        console.log("Using the Model: ", service);
        //console.log("not using the model: ", this.state.service);

        service_add(service).then(() => {
            console.log("added new service");

        });

    };

    render() {


        const validationSchema = Yup.object().shape({
            odometer: Yup.number().min(0, "Must be greater than 0").required("Must enter a value"),
            serviced_at: Yup.date().required("Must enter a date")
        });

        return(

            <Formik
                initialValues={{odometer: "", serviced_at: ""}}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    this.onSubmit(values)
                }}
            >
                {({values, errors, touched, handleChange, handleBlur, handleSubmit}) => (
                    <form id="newServiceForm" onSubmit={handleSubmit}>
                        <MDBRow>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Odometer </label>
                                <input className={touched.odometer && errors.odometer ? "form-control is-invalid" : "form-control"} type="number" pattern="[0-9]*" name="odometer" value={values.odometer} onChange={handleChange} onBlur={handleBlur} placeholder="Odometer"/>
                                <Error touched={touched.odometer} message={errors.odometer}/>
                            </MDBCol>
                            <MDBCol md="6" className="mb-3">
                                <label className="grey-text"> Date of service </label>
                                <input className={touched.serviced_at && errors.serviced_at ? "form-control is-invalid" : "form-control"} type="date" name="serviced_at" value={values.serviced_at} onChange={handleChange} onBlur={handleBlur} placeholder="Date of Service"/>
                                <Error touched={touched.serviced_at} message={errors.serviced_at}/>
                            </MDBCol>
                        </MDBRow>
                    </form>
                )}
            </Formik>


        );
    }

}

export default ServiceForm;
