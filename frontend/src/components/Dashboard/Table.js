import React from 'react';
import {MDBDataTable, MDBRow, MDBCol} from 'mdbreact';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfoCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {vehicle_delete} from "../../VehicleFunctions";

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
        },
        {
            label: 'buttons',
            field: 'btns',
            sort: 'asc',
            width: 100
        }
    ];

    // Add edit and delete icons to each element on the rows array
    const rows = props.rows.map(obj => ({
            ...obj,
            btns:
                <MDBRow>
                    <MDBCol><Link to={`/vehicle/edit/${obj.id}`}><FontAwesomeIcon icon={faEdit} /></Link></MDBCol>
                    <MDBCol><Link to={`/details3/${obj.id}`}><FontAwesomeIcon icon={faInfoCircle} /></Link></MDBCol>
                    <MDBCol id="trash"><FontAwesomeIcon icon={faTrashAlt} onClick={() => vehicle_delete(obj.id)}/></MDBCol>
                </MDBRow>


        })
    );


    const data = {
        columns,
        rows
    };

    console.log("TABLE data: ");
    console.log(data);
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