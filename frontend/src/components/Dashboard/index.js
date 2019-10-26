import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {MDBBtn, MDBDataTable} from 'mdbreact';

const data = {
    columns: [
        {
            label: 'Name',
            field: 'name',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Position',
            field: 'position',
            sort: 'asc',
            width: 270
        },
        {
            label: 'Office',
            field: 'office',
            sort: 'asc',
            width: 200
        },
        {
            label: 'Age',
            field: 'age',
            sort: 'asc',
            width: 100
        },
        {
            label: 'Start date',
            field: 'date',
            sort: 'asc',
            width: 150
        },
        {
            label: 'Salary',
            field: 'salary',
            sort: 'asc',
            width: 100
        }
    ],
    rows: [
        {
            name: 'Tiger Nixon',
            position: 'System Architect',
            office: 'Edinburgh',
            age: '61',
            date: '2011/04/25',
            salary: '$320'
        },
        {
            name: 'Garrett Winters',
            position: 'Accountant',
            office: 'Tokyo',
            age: '63',
            date: '2011/07/25',
            salary: '$170'
        },
        {
            name: 'Ashton Cox',
            position: 'Junior Technical Author',
            office: 'San Francisco',
            age: '66',
            date: '2009/01/12',
            salary: '$86'
        },
        {
            name: 'Cedric Kelly',
            position: 'Senior Javascript Developer',
            office: 'Edinburgh',
            age: '22',
            date: '2012/03/29',
            salary: '$433'
        },

        {
            name: 'Donna Snider',
            position: 'Customer Support',
            office: 'New York',
            age: '27',
            date: '2011/01/25',
            salary: '$112'
        }
    ]
};


class Dashboard extends Component {





    constructor(props){
        super(props);
        this.state = {
            board:{},
            key:'',
            data: [
                {
                    "id": 0,
                    "name": "Mayer Leonard",
                    "city": "Kapowsin",
                    "state": "Hawaii",
                    "country": "United Kingdom",
                    "company": "Ovolo",
                    "favoriteNumber": 7
                },
                {
                    "id": 1,
                    "name": "Lucios Lucer",
                    "city": "Kapowsin",
                    "state": "Hawaii",
                    "country": "United Kingdom",
                    "company": "Ovolo",
                    "favoriteNumber": 7
                }
            ]
        }



    }

    render(){
        return(
            <div>
                dash
                <MDBBtn className="danger-color">kk</MDBBtn>
                <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                />
            </div>
        );
    }


}

export default Dashboard;