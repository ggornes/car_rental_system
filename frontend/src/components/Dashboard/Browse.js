import React, {Component} from 'react';
import TablePage from './Table'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'mdbreact/dist/css/mdb.css'
import 'bootstrap/dist/css/bootstrap.css'
//import '@fortawesome'
import {MDBBtn, MDBCol, MDBContainer, MDBDataTable, MDBIcon, MDBRow} from 'mdbreact';

// const API = 'https://hn.algolia.com/api/v1/search?query=';
// const DEFAULT_QUERY = 'redux';


class Browse extends Component {

    constructor(props){
        super(props);
        this.state = {
            rows: [],
            hits: [],
        };

    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/vehicles/show')
            .then(response => response.json())
            .then(data=> data.map(obj=> ({ ...obj, btnEdit: <i className="fas fa-edit mr-2 grey-text" aria-hidden="true">Edit</i>, btnDelete: <MDBBtn color="red" size="sm">Delete</MDBBtn> })))
            .then(data => this.setState({ rows: data })
            );
    }


    render(){
        const { rows } = this.state;
        console.log(rows);


        const data2 = {
            columns: [
                {
                    label: 'id',
                    field: 'id',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Make',
                    field: 'make',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Model',
                    field: 'model',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Release Year',
                    field: 'release_year',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Rego',
                    field: 'registration',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Fuel Type',
                    field: 'fuel',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'Tank Size',
                    field: 'tank_size',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Initials',
                    field: 'initials',
                    sort: 'asc',
                    width: 100
                },
                {
                    label: 'Created',
                    field: 'created',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Updated',
                    field: 'updated',
                    sort: 'asc',
                    width: 100
                }

            ],
            rows
        };



        return(
            <div className="container">
                <h4>
                    Browse Vehicles
                </h4>
                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <TablePage data={data2}/>

                        </MDBCol>
                    </MDBRow>
                </MDBContainer>







            </div>
        );
    }


}

export default Browse;