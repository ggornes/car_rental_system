import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'mdbreact/dist/css/mdb.css'
import 'bootstrap/dist/css/bootstrap.css'
import {MDBBtn, MDBDataTable} from 'mdbreact';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';


class Dashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            board:{},
            key:'',
            rows: [],
            hits: [],
        };

    }

    componentDidMount() {
        fetch('http://127.0.0.1:5000/vehicles/show')
            .then(response => response.json())
            .then(data => this.setState({ rows: data })
            );
    }


    render(){
        const { rows } = this.state;
        console.log(rows);


        const data2 = {
            columns: [
                {
                    label: 'Created',
                    field: 'created',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Fuel Type',
                    field: 'fuel',
                    sort: 'asc',
                    width: 270
                },
                {
                    label: 'id',
                    field: 'id',
                    sort: 'asc',
                    width: 200
                },
                {
                    label: 'Initials',
                    field: 'initials',
                    sort: 'asc',
                    width: 100
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
                    label: 'Rego',
                    field: 'registration',
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
                    label: 'Tank Size',
                    field: 'tank_size',
                    sort: 'asc',
                    width: 100
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
            <div>

                <p></p>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data2}

                />
            </div>
        );
    }


}

export default Dashboard;