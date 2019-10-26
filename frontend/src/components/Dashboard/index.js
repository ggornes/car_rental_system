import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import 'mdbreact/dist/css/mdb.css'
import 'bootstrap/dist/css/bootstrap.css'
import {MDBBtn, MDBDataTable} from 'mdbreact';

const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

/*
const data2 = {
    columns: [
        {
            label: 'id',
            field: 'id',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Make',
            field: 'make',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Model',
            field: 'model',
            sort: 'asc',
            width: 200
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
            width: 150
        },
        {
            label: 'Fuel Type',
            field: 'fuel',
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
            label: 'Initials',
            field: 'initials',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Created',
            field: 'created',
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
    rows: [
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 1,
            "initials": "DC",
            "make": "Ariel",
            "model": "Atom 4",
            "registration": "1ARI444",
            "release_year": 2019,
            "tank_size": "40.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 2,
            "initials": "GG",
            "make": "BMW",
            "model": "X5",
            "registration": "1BGZ784",
            "release_year": 2006,
            "tank_size": "93.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 3,
            "initials": "HS",
            "make": "Holden",
            "model": "Commodore Sportwagon RS-V",
            "registration": "1DWU656",
            "release_year": 2019,
            "tank_size": "50.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 4,
            "initials": "KF",
            "make": "Holden",
            "model": "Barina",
            "registration": "1KJH123",
            "release_year": 2018,
            "tank_size": "40.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 5,
            "initials": "DL",
            "make": "Ford",
            "model": "Ranger XL",
            "registration": "1GVL526",
            "release_year": 2015,
            "tank_size": "80.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Electric",
            "id": 6,
            "initials": "FM",
            "make": "Tesla",
            "model": "Roadster",
            "registration": "8HDZ576",
            "release_year": 2008,
            "tank_size": "0.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 7,
            "initials": "MC",
            "make": "Holden",
            "model": "Commodore LT ",
            "registration": "1GXI000",
            "release_year": 2018,
            "tank_size": "61.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 8,
            "initials": "XX",
            "make": "Mitsubishi",
            "model": "Lancer",
            "registration": "1QWE456",
            "release_year": 2015,
            "tank_size": "45.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 9,
            "initials": "LW",
            "make": "BMW",
            "model": "Z4",
            "registration": "HMM B33R",
            "release_year": 2019,
            "tank_size": "52.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Gas",
            "id": 10,
            "initials": "CP",
            "make": "Hyundai",
            "model": "Sonata Premium",
            "registration": "ICTPRG403",
            "release_year": 2018,
            "tank_size": "70.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 11,
            "initials": "MF",
            "make": "Chevrlet",
            "model": "Cadillac",
            "registration": "C4D1LL4C",
            "release_year": 1959,
            "tank_size": "79.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 12,
            "initials": "MG",
            "make": "Ford",
            "model": "Territory ",
            "registration": "T3RR1TORY",
            "release_year": 2014,
            "tank_size": "55.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 13,
            "initials": "MC",
            "make": "Mitsubishi",
            "model": "Pajero GLS",
            "registration": "2MCR657",
            "release_year": 2019,
            "tank_size": "90.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 14,
            "initials": "DS",
            "make": "Mitsubishi",
            "model": "Eclipse Cross ES (2WD)",
            "registration": "1GGG292",
            "release_year": 2018,
            "tank_size": "63.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 15,
            "initials": "CP",
            "make": "Hyundai",
            "model": "Santa Fe Highlander CRDi Satin Dark",
            "registration": "ICTPRG418",
            "release_year": 2019,
            "tank_size": "71.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 16,
            "initials": "DS",
            "make": "Bugatti",
            "model": "Veyron 16.4 Super Sport",
            "registration": "1FST319",
            "release_year": 2011,
            "tank_size": "100.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 17,
            "initials": "HV",
            "make": "Toyota",
            "model": "Yaris",
            "registration": "YGT427",
            "release_year": 2019,
            "tank_size": "42.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Gas",
            "id": 18,
            "initials": "CP",
            "make": "Hyundai",
            "model": "Elantra SR Turbo",
            "registration": "ICTPRG404",
            "release_year": 2017,
            "tank_size": "50.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Petrol",
            "id": 19,
            "initials": "HV",
            "make": "Toyota",
            "model": "Corolla Hatch",
            "registration": "CHT185",
            "release_year": 2019,
            "tank_size": "50.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 20,
            "initials": "DL",
            "make": "Land Rover",
            "model": "Defender",
            "registration": "BCZ581",
            "release_year": 2015,
            "tank_size": "60.0",
            "updated": null
        },
        {
            "created": "Fri, 25 Oct 2019 21:40:34 GMT",
            "fuel": "Diesel",
            "id": 21,
            "initials": "MP",
            "make": "Ford",
            "model": "escape titanium",
            "registration": "FR2917",
            "release_year": 2019,
            "tank_size": "64.0",
            "updated": null
        }
    ]
};

 */


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