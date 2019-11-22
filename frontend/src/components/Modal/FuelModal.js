import React, { Component } from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import FuelPurchaseForm from "../../Forms/FuelPurchaseForm";

class FuelModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal14: false,

        };

    };

    toggle = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });
    };

    render(){
        return(
            <MDBContainer>
                <MDBBtn color="primary" onClick={this.toggle(14)}>Add a fuel purchase</MDBBtn>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBModalHeader toggle={this.toggle(14)}>Add new fuel purchase</MDBModalHeader>
                    <MDBModalBody>
                        <p>Please enter journey details</p>
                        <FuelPurchaseForm vehicleId={this.props.vehicleId} rentalId={this.props.rentalId}/>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
                        <MDBBtn form="newFuelPurchaseForm" type="submit" color="primary">Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }
}

export default FuelModal;