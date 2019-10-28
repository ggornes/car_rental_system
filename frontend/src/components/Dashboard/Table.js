import React from 'react';
import {MDBBtn, MDBDataTable, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

const TablePage = (props) => {
    const columns = [
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
    ];

    const rows_regular_btn = [
        {
            'id': 1,
            'first': <MDBBtn color="purple" size="sm">Button</MDBBtn>,
            'last': 'Otto',
            'handle': '@mdo'
        },
        {
            'id': 2,
            'first': 'Jacob',
            'last': <MDBBtn color="purple" size="sm">Button</MDBBtn>,
            'handle': '@fat'
        },
        {
            'id': 3,
            'first': 'Larry',
            'last': 'the Bird',
            'handle': <MDBBtn color="purple" size="sm">Button</MDBBtn>
        }
    ];

    const data = props.data;

    return(
        <MDBDataTable data={data}>

        </MDBDataTable>
    );
};

export default TablePage;