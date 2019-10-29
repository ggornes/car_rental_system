import React from 'react';
import {MDBBtn, MDBDataTable, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';

const TablePage = (props) => {
    const columns = [
        {
            label: 'id',
            field: 'id',
            sort: 'asc',
            width: 50
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
            label: 'Registration',
            field: 'registration',
            sort: 'asc',
            width: 100
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
        }/*,
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
        }*/
    ];


    const rows = props.rows;

    const data = {
        columns,
        rows
    };

    return(
        <MDBDataTable
            striped
            hover
            small
            data={data}>

        </MDBDataTable>
    );
};

export default TablePage;