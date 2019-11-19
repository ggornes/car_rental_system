import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Link} from 'react-router-dom';
import {addToList, addToList2} from "../../VehicleFunctions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {VehicleFormErrors} from "../../Forms/VehicleFormErrors";


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

        // ToDo: Validate fields
        // if field is empty, var = default;



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

        return(
            <div className="container">
                <h4>
                    Add Vehicle
                </h4>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">




                            <div className="panel panel-default">
                                <VehicleFormErrors formErrors={this.state.formErrors} />
                            </div>
                            <form onSubmit={this.onSubmit}>

                                <MDBRow>
                                    <MDBCol md="5" className="mb-3">
                                        <label className="grey-text"> Make </label>
                                        <input type="text" className="form-control" name="make" value={this.state.vehicle.make} onChange={this.onChange} placeholder="Make" required/>
                                    </MDBCol>
                                    <MDBCol md="5" className="mb-3">
                                        <label className="grey-text"> Model </label>
                                        <input type="text" className="form-control" name="model" value={this.state.vehicle.model} onChange={this.onChange} placeholder="Model" required/>
                                    </MDBCol>
                                    <MDBCol md="2" className="mb-3">
                                        <label className="grey-text"> Year </label>
                                        <input type="number" pattern="[0-9]*" className="form-control" name="release_year" value={this.state.vehicle.release_year} onChange={this.onChange} placeholder="Year" required/>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="5" className="mb-3">
                                        <label className="grey-text"> Registration Number </label>
                                        <input type="text" className="form-control" name="registration" value={this.state.vehicle.registration} onChange={this.onChange} placeholder="Registration Number"/>
                                    </MDBCol>
                                </MDBRow>

                                <MDBRow>
                                    <MDBCol md="4" className="mb-3">
                                        <label className="grey-text"> Fuel Type </label>
                                        <input type="text" className="form-control" name="fuel" value={this.state.vehicle.fuel} onChange={this.onChange} placeholder="Fuel Type"/>
                                    </MDBCol>
                                    <MDBCol md="4" className="mb-3">
                                        <label className="grey-text"> Tank Size </label>
                                        <input type="number" pattern="[0-9]*" className="form-control" name="tank_size" value={this.state.vehicle.tank_size} onChange={this.onChange} placeholder="Tank Size"/>
                                    </MDBCol>
                                    <MDBCol md="4" className="mb-3">
                                        <label className="grey-text"> Initials </label>
                                        <input type="text" className="form-control" name="initials" value={this.state.vehicle.initials} onChange={this.onChange} placeholder="Initials"/>
                                    </MDBCol>
                                </MDBRow>



                                <div><br/></div>


                                <div><br/></div>




                                <div className="form-row">
                                    <MDBBtn type="submit" color="dark-green" disabled={!this.state.formValid}>Save</MDBBtn>
                                    <MDBBtn onClick={this.onClear} color="yellow">Clear</MDBBtn>
                                    <MDBBtn onClick={this.onCancel} color="red">Cancel</MDBBtn>
                                </div>

                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        );
    };


}

export default Add;