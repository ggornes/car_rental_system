import React, { Component } from 'react';
import {MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader} from "mdbreact";
import RentalForm from "../../Forms/RentalForm";
import FuelPurchaseForm from "../../Forms/FuelPurchaseForm";
import ServiceForm from "../../Forms/ServiceForm";

class FuelModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modal14: false,
            modal13: false

        };

    };


    handleSubmit = nr => () => {
        let modalNumber = 'modal' + nr;
        this.setState({
            [modalNumber]: !this.state[modalNumber]
        });

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
                <MDBBtn color="primary" onClick={this.toggle(14)}>Add service</MDBBtn>
                <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
                    <MDBModalHeader toggle={this.toggle()}>Add new service</MDBModalHeader>
                    <MDBModalBody>
                        <p>Please enter service details</p>
                        <ServiceForm vehicleId={this.props.vehicleId} />

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle(14)}>Close</MDBBtn>
                        <MDBBtn form="newServiceForm" type="submit" color="primary" onClick={this.handleSubmit(14)}>Save changes</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        )
    }

}

export default FuelModal;