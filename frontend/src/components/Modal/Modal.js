import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {addNewRental, addToList2} from "../../VehicleFunctions";

class ModalPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal14: false,
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






        //addToList2(this.state.vehicle).then(() => {
            //this.getAll()
            // redirect
            // show success or error message
        //})


    };




    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render() {
        return (
            <MDBContainer>
                <MDBBtn color="primary" onClick={this.toggle(14)}>Add New Journey</MDBBtn>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBModalHeader toggle={this.toggle(14)}>Add New Rental</MDBModalHeader>
                    <MDBModalBody>
                        <p>Please enter journey details</p>
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

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
                        <MDBBtn form="newRentalForm" type="submit" color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ModalPage;