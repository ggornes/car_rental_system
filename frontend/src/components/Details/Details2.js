import React, {Component} from "react";
import {MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBTooltip} from "mdbreact";
import {Accordion, Card, Tab, Container, Row, Col, Nav} from 'react-bootstrap';
import TablePage from "../Dashboard/Table";
import StaticTable from "../Dashboard/StaticTable";
import StaticTable2 from "../Dashboard/StaticTable2";



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
            journeys: [
                {
                    id: '1',
                    journey_at: '01/01/2019',
                    distance: '974Km'
                },
                {
                    id: '2',
                    journey_at: '25/11/2020',
                    distance: '134Km'}
                ],
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
                <h1>
                    Vehicle Details
                </h1>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="first">{this.state.vehicle.make + ' ' + this.state.vehicle.model + ' ' + this.state.vehicle.release_year}</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second">Journeys</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third">Services</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <h4>Vehicle Details</h4>
                                    <ul>
                                        <StaticTable rows={[this.state.vehicle]}/>
                                    </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <h4>Journeys</h4>
                                    <p><strong>Total Journeys: </strong>2</p>
                                    <p><strong>Distance Travelled: </strong>1,008 Km</p>
                                    <h4>History</h4>
                                    <StaticTable2 columns={[{
                                        label: 'id',
                                        field: 'id',
                                        sort: 'asc',
                                        width: 50
                                    },
                                        {
                                            label: 'Date',
                                            field: 'journey_at',
                                            sort: 'asc',
                                            width: 150
                                        },
                                        {
                                            label: 'Distance',
                                            field: 'distance',
                                            sort: 'asc',
                                            width: 100
                                        }]} rows={this.state.journeys}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="third">
                                    <h4>Services History</h4>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>


                <br/><br/><br/><br/><br/>



            </div>
        )
    }


}

export default Details;