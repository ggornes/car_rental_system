import React from 'react';
import {MDBBtn, MDBDataTable, MDBRow, MDBCol, MDBTable, MDBTableBody, MDBTableHead} from 'mdbreact';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faInfoCircle, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

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
                    <MDBCol><Link to={`/details2/${obj.id}`}><FontAwesomeIcon icon={faEdit} /></Link></MDBCol>
                    <MDBCol><Link to={{pathname: `/details2/${obj.id}`,vehicle:obj}}><FontAwesomeIcon icon={faInfoCircle} /></Link></MDBCol>
                    <MDBCol><Link to={'/details2/11'}><FontAwesomeIcon icon={faTrashAlt} /></Link></MDBCol>
                    <MDBCol><MDBBtn floating size="lg" gradient="purple"><FontAwesomeIcon icon={faEdit} /></MDBBtn></MDBCol>
                    <MDBCol><MDBBtn floating size="lg" gradient="purple"><FontAwesomeIcon icon={faInfoCircle} /></MDBBtn></MDBCol>
                    <MDBCol><MDBBtn floating size="lg" gradient="purple"><FontAwesomeIcon icon={faTrashAlt} /></MDBBtn></MDBCol>
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