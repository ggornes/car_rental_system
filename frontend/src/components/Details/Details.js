import React, {Component} from "react";
import {MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBTooltip} from "mdbreact";
import {Accordion, Card} from 'react-bootstrap';



class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id:'',
            vehicle: {
                make:'Holden',
                model:'Commodore',
                release_year:'2004',
                registration: '1VGZ123',
                fuel: 'Petrol',
                tank_size: '55',
                initials: 'LML',
            }
        };
    };

    componentDidMount() {
        console.log("this.props: " + this.props);
        const API = 'http://127.0.0.1:5000/vehicles/show/10';
        const DEFAULT_QUERY = ''; //tofix
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())

            .then(data => this.setState(
                {
                    vehicle: data[0],
                    isLoaded: true,
                }
                )
            )
    }



    render() {
        return(
            <div className="container">
                <h4>
                    Vehicle Details
                </h4>

                <MDBContainer>
                    <MDBListGroup style={{ width: "22rem" }}>
                        <MDBListGroupItem active color="primary">


                            <div style={{ display: "flex" }}>
                                <MDBTooltip placement="right">
                                    <MDBBtn>{this.state.vehicle.make + ' ' + this.state.vehicle.model + ' ' + this.state.vehicle.release_year}</MDBBtn>
                                    <div>
                                        Id: {this.state.vehicle.id}
                                    </div>
                                </MDBTooltip>
                            </div>


                            <MDBRow>

                            </MDBRow>


                        </MDBListGroupItem>
                        <MDBListGroupItem>{this.state.vehicle.registration}</MDBListGroupItem>
                        <MDBListGroupItem></MDBListGroupItem>


                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0" color="secondary">
                                        Journeys<MDBBadge color="primary" className="ml-2">5</MDBBadge>
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                            <MDBListGroupItem>249 km travelled</MDBListGroupItem>
                                            <MDBListGroupItem>25L of petrol consumed</MDBListGroupItem>
                                            <MDBListGroupItem>10 L / 100 km</MDBListGroupItem>

                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    <MDBBadge color="blue" className="ml-2">4</MDBBadge> services
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body><MDBListGroupItem>Require service: false</MDBListGroupItem></Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>


                    </MDBListGroup>
                </MDBContainer>



            </div>
        )
    }


}

export default Details;