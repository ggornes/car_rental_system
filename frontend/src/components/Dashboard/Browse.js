import React, {Component} from 'react';
import TablePage from './Table'
import { Link } from 'react-router-dom';
import 'mdbreact/dist/css/mdb.css'
import 'bootstrap/dist/css/bootstrap.css'
import { faHome, faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {MDBCol, MDBContainer, MDBRow} from 'mdbreact';
import {deleteItem, getVehicleById} from "../../VehicleFunctions";
import {Circle} from "styled-spinkit";


class Browse extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rows: [],
            vehicle_def: [{
                id: '11',
                make:'Holden',
                model:'Commodore',
                release_year:'2004',
                registration: '1VGZ123',
                fuel: 'Petrol',
                tank_size: '55',
                initials: 'LML',
                btnEdit: <Link to={'/details2/11'}><FontAwesomeIcon icon={faEdit} /></Link>,
                btnDelete: <Link to={'/details2/11'}><FontAwesomeIcon icon={faInfoCircle} /></Link>,

            }],
        };

    }


    componentDidMount() {
        fetch('http://127.0.0.1:5000/vehicles/show')
            .then(response => response.json())
            .then(data => this.setState({
                rows: data,
                isLoaded: true
            })

            )
            //.catch(error => this.setState({ error, isLoaded: false }));
            // just in case the connection can not be established, we use the vehicle_default
            .catch(error => this.setState({ error, rows: this.state.vehicle_def, isLoaded: true }));
    }


    render(){

        const rows = this.state.rows;
        console.log(rows);
        if (this.state.error !== null){
            console.log("error: " + this.error);
        }

        return(
            <div className="container">
                <h4>
                    Browse Vehicles
                </h4>

                {this.state.isLoaded ?
                    (
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <TablePage rows={rows}/>

                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    )
                    :
                    (
                        <div>
                            <Circle color="blue"
                                    size="80"
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}

export default Browse;