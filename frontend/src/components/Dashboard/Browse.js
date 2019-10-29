import React, {Component} from 'react';
import TablePage from './Table'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'mdbreact/dist/css/mdb.css'
import 'bootstrap/dist/css/bootstrap.css'

import {MDBBtn, MDBCol, MDBContainer, MDBDataTable, MDBIcon, MDBRow} from 'mdbreact';
import {deleteItem, getVehicles} from "../../VehicleFunctions";
import {Circle} from "styled-spinkit";

// const API = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'redux';


class Browse extends Component {

    constructor(props){
        super(props);
        this.state = {
            rows: [],
            isLoading: true
        };

    }



    componentDidMount() {
        fetch('http://127.0.0.1:5000/vehicles/show2')
            .then(response => response.json())
            .then(data => data.map(obj=> ({
                ...obj,
                btnEdit: <i className="fas fa-edit mr-2 grey-text">Edit</i>,
                btnDelete: <MDBBtn id={obj.id} color="red" size="sm" onClick={this.onDelete}>Delete</MDBBtn> })))
            .then(data => this.setState({ rows: data, isLoading: false })
            );
    }

    onDelete = (e) => {
        console.log(e.target.id);
        deleteItem(e.target.id);
        // ToDo: refresh the vehicles table

    };




    render(){
        //const { columns, rows } = this.state;
        const rows = this.state.rows;
        //console.log(columns);
        console.log(rows);



        return(
            <div className="container">
                <h4>
                    Browse Vehicles

                </h4>


                {this.state.isLoading ?
                    (
                        <Circle color="blue"
                                size="80"
                        />

                    )
                    :
                    (
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12">
                                    <TablePage rows={rows}/>

                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>

                    )
                }








            </div>
        );
    }


}

export default Browse;