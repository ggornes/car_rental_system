import React, {Component} from "react";
import {MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBTooltip} from "mdbreact";
import {Accordion, Card, Tab, Container, Row, Col, Nav} from 'react-bootstrap';
import TablePage from "../Dashboard/Table";
import StaticTable from "../Dashboard/StaticTable";



class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            id:'17',
            vehicle: {
                make:'Holden',
                model:'Commodore',
                release_year:'2004',
                registration: '1VGZ123',
                fuel: 'Petrol',
                tank_size: '55',
                initials: 'LML',
            },
            journeys: {

            },
            services: {

            },
            fuel_purchases: {

            }
        };
    };

    componentDidMount() {
        console.log("this.props: " + this.props);
        const API = 'http://127.0.0.1:5000/vehicles/show/17';
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
                    <MDBRow>
                        <MDBCol>
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
                                    <Card color="blue">
                                        <Accordion.Toggle as={Card.Header} eventKey="0">
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
                        </MDBCol>

                        <MDBCol>
                            <h2>Journey History</h2>
                            <h2>Service History</h2>
                            <h2>Fuel Purchases</h2>

                        </MDBCol>
                    </MDBRow>

                </MDBContainer>



            </div>
        )
    }


}

export default Details;