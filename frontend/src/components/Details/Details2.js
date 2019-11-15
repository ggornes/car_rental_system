import React, {Component} from "react";
import {
    MDBBadge,
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBListGroup,
    MDBListGroupItem,
    MDBRow,
    MDBTooltip
} from "mdbreact";
import {Accordion, Card, Tab, Container, Row, Col, Nav} from 'react-bootstrap';
import TablePage from "../Dashboard/Table";
import DetailsTable from "../Dashboard/DetailsTable";
import RentalsTable from "../Dashboard/RentalsTable";
import RentalModal from "../Modal/RentalModal";
import {faTable} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FuelModal from "../Modal/FuelModal";
import ServicesModal from "../Modal/ServicesModal";



class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,

            // MDB modal
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
                total_distance: '444',
                total_cost: ''
            }],

            services: [{

            }],
            services_summary: {},

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
        const API2 = 'http://127.0.0.1:5000/vehicles/rentals/' + `${vehicleId}`;
        const API3 = 'http://127.0.0.1:5000/vehicles/fuel_purchases/' + `${vehicleId}`;
        const API4 = 'http://127.0.0.1:5000/vehicles/services/' + `${vehicleId}`;
        const API5 = 'http://127.0.0.1:5000/vehicles/rentals/sum/' + `${vehicleId}`;
        const API6 = 'http://127.0.0.1:5000/vehicles/services/sum/' + `${vehicleId}`;
        const API7 = 'http://127.0.0.1:5000/vehicles/fuel_purchases/sum/' + `${vehicleId}`;
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
            fetch(API4),
            fetch(API5),
            fetch(API6),
            fetch(API7)
        ])
            .then(([res1, res2, res3, res4, res5, res6, res7]) => Promise.all([res1.json(), res2.json(), res3.json(), res4.json(), res5.json(), res6.json(), res7.json()]))
            .then(([data1, data2, data3, data4, data5, data6, data7]) => this.setState({
                vehicle: data1[0], // data[0] if using flask app 2.2, data if is 3.0 -> fixed. always data1[0]
                rentals: data2, // data2[0] if using app 2.2, data2 if using 3.0 Reason is: v2.2 returns two arrays inside an array. v3.0 use two different api endpoints
                rentals_summary: data5,
                fuel_purchases: data3,
                fuel_purchases_summary: data7,
                services: data4,
                services_summary: data6

            }));




    }



    render() {
        return(
            <div className="container">
                <h1>
                    {this.state.vehicle.make + ' ' + this.state.vehicle.model + ' ' + this.state.vehicle.release_year}
                </h1>

                <Tab.Container id="left-tabs-example" defaultActiveKey="details">
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


                                    <MDBContainer>
                                        <MDBRow>

                                            <MDBCol>
                                                <MDBRow><h4>Vehicle Details</h4></MDBRow>
                                                <MDBRow>
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td>id</td>
                                                                <td>{this.state.vehicle.id}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Make</td>
                                                                <td>{this.state.vehicle.make}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Model</td>
                                                                <td>{this.state.vehicle.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Release Year</td>
                                                                <td>{this.state.vehicle.release_year}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Registration</td>
                                                                <td>{this.state.vehicle.registration}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Fuel Type</td>
                                                                <td>{this.state.vehicle.fuel}</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Tank Size</td>
                                                                <td>{this.state.vehicle.tank_size}</td>
                                                            </tr>
                                                        </tbody>

                                                    </table>
                                                </MDBRow>
                                            </MDBCol>



                                            <MDBCol>
                                                <MDBRow>
                                                    <h4>Summary</h4>
                                                </MDBRow>
                                                <MDBRow>
                                                    <ul>
                                                        <li><strong>Distance Travelled: </strong>{this.state.rentals_summary.total_distance} Km</li>
                                                        <li><strong>Fuel Economy: </strong>{this.state.rentals_summary.total_distance/this.state.fuel_purchases_summary.total_amount} Km/L</li>
                                                        <li><strong>Total Services: </strong> {this.state.services_summary.total_services}</li>
                                                    </ul>
                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol></MDBCol>

                                        </MDBRow>

                                    </MDBContainer>



                                </Tab.Pane>
                                <Tab.Pane eventKey="rentals">
                                    <h4>Rentals</h4>
                                    <p><strong>Total Rentals: </strong>{this.state.rentals_summary.total_rentals}</p>
                                    <p><strong>Distance Travelled: </strong>{this.state.rentals_summary.total_distance} Km</p>
                                    <p><strong>Revenue Recorded: </strong>${this.state.rentals_summary.total_cost}</p>
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
                                            },
                                            {
                                                label: 'Rental Cost',
                                                field: 'rental_cost',
                                                sort: 'asc',
                                                width: 100
                                            }
                                        ]
                                        }
                                        rows={this.state.rentals}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fuel_purchases">
                                    <h4>Fuel Purchases</h4>
                                    <p><strong>Total Amount (Liters): </strong>{this.state.fuel_purchases_summary.total_amount} L</p>
                                    <p><strong>Total Price: </strong>$ {this.state.fuel_purchases_summary.total_cost}</p>
                                    <FuelModal open={this.state.showModal} vehicleId={this.state.vehicleId}>...</FuelModal>
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
                                    <ServicesModal open={this.state.showModal} vehicleId={this.state.vehicleId}>...</ServicesModal>
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