import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {addNewRental, addToList2} from "../../VehicleFunctions";
import RentalForm from "../../Forms/RentalForm";

class RentalModalPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal14: false,

        };
    }


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
                        <RentalForm vehicleId={this.props.vehicleId}/>

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

export default RentalModalPage;