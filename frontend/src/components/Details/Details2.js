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
import {faEdit, faInfoCircle, faPlusSquare, faTable, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FuelModal from "../Modal/FuelModal";
import ServicesModal from "../Modal/ServicesModal";
import {Link} from "react-router-dom";
import {deleteItem} from "../../VehicleFunctions";



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

        const API = 'http://127.0.0.1:5000/vehicles/show/' + `${vehicleId}`;
        const API_rentals = 'http://127.0.0.1:5000/vehicles/rentals/' + `${vehicleId}`;
        const API_fuelPurchases = 'http://127.0.0.1:5000/vehicles/fuel_purchases/' + `${vehicleId}`;
        const API_services = 'http://127.0.0.1:5000/vehicles/services/' + `${vehicleId}`;
        const API_rentals_sum = 'http://127.0.0.1:5000/vehicles/rentals/sum/' + `${vehicleId}`;
        const API_services_sum = 'http://127.0.0.1:5000/vehicles/services/sum/' + `${vehicleId}`;
        const API_fuelPurchases_sum = 'http://127.0.0.1:5000/vehicles/fuel_purchases/sum/' + `${vehicleId}`;
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
            fetch(API_rentals),
            fetch(API_fuelPurchases),
            fetch(API_services),
            fetch(API_rentals_sum),
            fetch(API_services_sum),
            fetch(API_fuelPurchases_sum)
        ])
            .then((
                [res1, res_API_rentals, res_API_fuelPurchases, res_API_services, res_API_rentals_sum, res_API_services_sum, res_API_fuelPurchases_sum]) => Promise.all([res1.json(), res_API_rentals.json(), res_API_fuelPurchases.json(), res_API_services.json(), res_API_rentals_sum.json(), res_API_services_sum.json(), res_API_fuelPurchases_sum.json()]))
            .then(([data1, data_API_rentals, data_API_fuelPurchases, data_API_services, data_API_rentals_sum, data_API_services_sum, data_API_fuelPurchases_sum]) => this.setState({
                vehicle: data1[0],
                rentals: data_API_rentals,
                rentals_summary: data_API_rentals_sum,
                fuel_purchases: data_API_fuelPurchases,
                fuel_purchases_summary: data_API_fuelPurchases_sum,
                services: data_API_services,
                services_summary: data_API_services_sum,
                rentals_rows: data_API_rentals.map(obj => ({
                    ...obj,
                    btns:
                        <MDBRow>
                            <FuelModal open={this.state.showModal} vehicleId={this.state.vehicleId} rentalId={obj.id}>...</FuelModal>

                        </MDBRow>


                }))


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
                            <Nav variant="pills" className="flex-column" >
                                <Nav.Item>
                                    <Nav.Link eventKey="details" >Details</Nav.Link>
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
                                                    <table className="tg">
                                                        <tbody>
                                                            <tr>
                                                                <th>id</th>
                                                                <td>{this.state.vehicle.id}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Make</th>
                                                                <td>{this.state.vehicle.make}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Model</th>
                                                                <td>{this.state.vehicle.model}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Release Year</th>
                                                                <td>{this.state.vehicle.release_year}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Registration</th>
                                                                <td>{this.state.vehicle.registration}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Fuel Type</th>
                                                                <td>{this.state.vehicle.fuel}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Tank Size</th>
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

                                                    <table className="tg">
                                                        <tbody>
                                                            <tr>
                                                                <th>Distance Travelled:</th>
                                                                <td>
                                                                    {new Intl.NumberFormat('en-AU', {
                                                                        style: 'unit',
                                                                        unit: 'kilometer'
                                                                    }).format(this.state.rentals_summary.total_distance)}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Fuel Economy: </th>
                                                                <td>
                                                                    {new Intl.NumberFormat('en-AU', {
                                                                        style: 'unit',
                                                                        unit: 'kilometer-per-liter'
                                                                    }).format(this.state.rentals_summary.total_distance/this.state.fuel_purchases_summary.total_amount)}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th>Total Services: </th>
                                                                <td>{this.state.services_summary.total_services}</td>
                                                            </tr>
                                                            <tr>
                                                                <th>Last Service Odo: </th>

                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </MDBRow>
                                            </MDBCol>
                                            <MDBCol></MDBCol>

                                        </MDBRow>

                                    </MDBContainer>



                                </Tab.Pane>
                                <Tab.Pane eventKey="rentals">
                                    <h3>Rentals</h3>
                                    <RentalModal open={this.state.showModal} vehicleId={this.state.vehicleId}>...</RentalModal>
                                    <h4>Summary</h4>

                                    <table className="tg">
                                        <tbody>
                                        <tr>
                                            <th>Total Rentals:</th>
                                            <td>
                                                {this.state.rentals_summary.total_rentals}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Distance Travelled: </th>
                                            <td>
                                                {new Intl.NumberFormat('en-AU', {
                                                    style: 'unit',
                                                    unit: 'kilometer'
                                                }).format(this.state.rentals_summary.total_distance)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Revenue Recorded: </th>
                                            <td>
                                                {new Intl.NumberFormat('en-AU', {
                                                    style: 'currency',
                                                    currency: 'AUD'
                                                }).format(this.state.rentals_summary.total_cost)}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


                                    <h4>History</h4>
                                    <RentalsTable
                                        columns={
                                        [
                                            {
                                                label: 'Id',
                                                field: 'id',
                                                sort: 'asc',
                                                width: 100
                                            },
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
                                            },
                                            {
                                                label: 'Action'
                                            }
                                        ]
                                        }
                                        rows={this.state.rentals_rows}/>
                                </Tab.Pane>
                                <Tab.Pane eventKey="fuel_purchases">
                                    <h3>Fuel Purchases</h3>
                                    <FuelModal open={this.state.showModal} vehicleId={this.state.vehicleId}>...</FuelModal>
                                    <h4>Summary</h4>

                                    <table className="tg">
                                        <tbody>
                                        <tr>
                                            <th>Total Amount:</th>
                                            <td>
                                                {new Intl.NumberFormat('en-AU', {
                                                    style: 'unit',
                                                    unit: 'liter'
                                                }).format(this.state.fuel_purchases_summary.total_amount)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Total Price: </th>
                                            <td>
                                                {new Intl.NumberFormat('en-AU', {
                                                    style: 'currency',
                                                    currency: 'AUD'
                                                }).format(this.state.fuel_purchases_summary.total_cost)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Fuel Economy: </th>
                                            <td>{new Intl.NumberFormat('en-AU', {
                                                style: 'unit',
                                                unit: 'kilometer-per-liter'
                                            }).format(this.state.rentals_summary.total_distance/this.state.fuel_purchases_summary.total_amount)}
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>


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