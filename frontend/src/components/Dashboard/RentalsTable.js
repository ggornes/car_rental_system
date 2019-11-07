import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const StaticTable2 = props => {
    const columns = props.columns;

    const rows = props.rows;
    const extras = {
        btnEdit: '',
        btnDelete: ''
    };


    const data = {
        columns,
        rows
    };

    return (
        <MDBTable scrollY>
            <MDBTableHead color="secondary-color" columns={data.columns} />
            <MDBTableBody rows={data.rows} />
        </MDBTable>
    );
};

export default StaticTable2;