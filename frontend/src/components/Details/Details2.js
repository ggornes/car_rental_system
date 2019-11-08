import React, {Component} from "react";
import {MDBBadge, MDBBtn, MDBCol, MDBContainer, MDBListGroup, MDBListGroupItem, MDBRow, MDBTooltip} from "mdbreact";
import {Accordion, Card, Tab, Container, Row, Col, Nav} from 'react-bootstrap';
import TablePage from "../Dashboard/Table";
import DetailsTable from "../Dashboard/DetailsTable";
import RentalsTable from "../Dashboard/RentalsTable";
import RentalModal from "../Modal/RentalModal";



class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            showModal: false,

            vehicleId: '',
            vehicle: {
                make:'Holden',
                model:'Commodore',
                release_year:'2004',
                registration: '1VGZ123',
                fuel: 'Petrol',
                tank_size: '55',
                initials: 'LML',
            },

            rentals: [
                {
                    id: '1',
                    journey_at: '01/01/2019',
                    distance: '974Km',
                    rental_type: 'D'
                },
                {
                    id: '2',
                    journey_at: '25/11/2020',
                    distance: '134Km',
                    rental_type: 'K'
                }
                ],

            rentals_summary: [{
                total_rentals: '2',
                total_distance: '444'
            }],

            services: [{

            }],

            fuel_purchases: [
                {
                    id: '1',
                    amount: '50',
                    price: '75'
                },
                {
                    id: '2',
                    amount: '35',
                    price: '50'
                }
            ],

            fuel_purchases_summary: [{
                total_fuel_purchases: '2',
                total_amount: '444',
                total_cost: '555'
            }],
        };
    };

    componentDidMount() {

        const { myid } = this.props.match.params;
        console.log("myid:", myid);

        const vehicleId = myid;
        this.setState({vehicleId : myid});

        // const API = 'http://127.0.0.1:5000/vehicles/show/17';
        const API = 'http://127.0.0.1:5000/vehicles/show/' + `${vehicleId}`;
        const API2 = 'http://127.0.0.1:5000/vehicles/rentals2/' + `${vehicleId}`;
        const API3 = 'http://127.0.0.1:5000/vehicles/fuel_purchases2/' + `${vehicleId}`;
        const API4 = 'http://127.0.0.1:5000/vehicles/services2/' + `${vehicleId}`;
        const DEFAULT_QUERY = ''; //tofix



        // console.log(API);

        /*
        fetch(API + DEFAULT_QUERY)
            .then(response => response.json())

            .then(data => this.setState(
                {
                    vehicle: data[0],
                    isLoaded: true,
                }
                )
            )

         */



        Promise.all([
            fetch(API),
            fetch(API2),
            fetch(API3),
            fetch(API4)
        ])
            .then(([res1, res2, res3, res4]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json()]))
            .then(([data1, data2, data3, data4]) => this.setState({
                vehicle: data1[0],
                rentals: data2[0],
                rentals_summary: data2[1],
                fuel_purchases: data3[0],
                fuel_purchases_summary: data3[1],
                services: data4

            }));

    }



    render() {
        return(
            <div className="container">
                <h1>
                    {this.state.vehicle.make + ' ' + this.state.vehicle.model + ' ' + this.state.vehicle.release_year}
                </h1>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link eventKey="details">Details</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="rentals">Rentals</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="fuel_purchases">Fuel Purchases</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="services">Services</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="details">
                                    <h4>Vehicle Details</h4>
                                    <ul>
                                        <DetailsTable rows={[this.state.vehicle]}/>
                                    </ul>
                                </Tab.Pane>
                                <Tab.Pane eventKey="rentals">
                                    <h4>Rentals</h4>
                                    <p><strong>Total Rentals: </strong>{this.state.rentals_summary[0].total_rentals}</p>
                                    <p><strong>Distance Travelled: </strong>{this.state.rentals_summary[0].total_distance} Km</p>
                                    <RentalModal open={this.state.showModal} vehicleId={this.state.vehicleId}>...</RentalModal>
                                    <h4>History</h4>
                                    <RentalsTable
                                        columns={
                                        [
                                            {
                                                label: 'Date Start',
                                                field: 'date_start',
                                                sort: 'asc',
                                                width: 100
                                            },
                                            {
                                                label: 'Distance',
                                                field: 'distance',
                                                sort: 'asc',
                                                width: 100
                                            },
                                            {
                                                label: 'Date End',
                                                field: 'date_end',
                                                sort: 'asc',
                                                width: 100
                                            },
                                            {
                                                label: 'Rental Type',
                                                field: 'rental_type',
                                                sort: 'asc',
                                                width: 100
                                            }
                                        ]
                                        }
                                        rows={this.state.rentals}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fuel_purchases">
                                    <h4>Fuel Purchases</h4>
                                    <p><strong>Total Amount (Liters): </strong>{this.state.fuel_purchases_summary[0].total_amount} L</p>
                                    <p><strong>Total Price: </strong>$ {this.state.fuel_purchases_summary[0].total_cost}</p>
                                    <h4>History</h4>
                                    <RentalsTable rows={[this.state.vehicle]}
                                        columns={
                                            [
                                                {
                                                    label: 'Date',
                                                    field: 'created',
                                                    sort: 'asc',
                                                    width: 50
                                                },
                                                {
                                                    label: 'Amount',
                                                    field: 'amount',
                                                    sort: 'asc',
                                                    width: 150
                                                },
                                                {
                                                    label: 'Price',
                                                    field: 'price',
                                                    sort: 'asc',
                                                    width: 100
                                                }
                                            ]
                                        }
                                        rows={this.state.fuel_purchases}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="services">
                                    <h4>Service History</h4>
                                    <RentalsTable rows={[this.state.vehicle]}
                                                  columns={
                                                      [
                                                          {
                                                              label: 'Date',
                                                              field: 'created',
                                                              sort: 'asc',
                                                              width: 50
                                                          },
                                                          {
                                                              label: 'Odometer Reading',
                                                              field: 'odometer',
                                                              sort: 'asc',
                                                              width: 150
                                                          }
                                                      ]
                                                  }
                                                  rows={this.state.services}/>

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