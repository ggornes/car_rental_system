import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Link} from 'react-router-dom';
import {addToList, addToList2} from "../../VehicleFunctions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                make:'',
                model:'',
                year:'',
                rego: '',
                fuel: '',
                tank_size: '',
                initials: '',
            }
        };


    }


    onChange = (e) => {

        const state = this.state;
        state.vehicle[e.target.name] = e.target.value;
        this.setState(state);

    };

    onSubmit = (e) => {

        // ToDo: Validate fields
        // if field is empty, var = default;



        e.preventDefault();
        console.log(this.state.vehicle);


        addToList2(this.state.vehicle).then(() => {
            //this.getAll()
            // redirect
            // show success or error message
        })


    };

    onClear = (e) => {
        const vehicle = {
            make:'',
            model:'',
            year:'',
            rego: '',
            fuel: '',
            tank_size: '',
            initials: ''
        };
        const state = this.state;
        this.state.vehicle = vehicle;
        this.setState(state);



    };

    render() {

        return(
            <div className="container">
                <h4>
                    Add Vehicle
                </h4>

                <MDBContainer>
                    <MDBRow>
                        <MDBCol md="12">
                            <form onSubmit={this.onSubmit}>

                                <div className="form-row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="make" value={this.state.vehicle.make} onChange={this.onChange} placeholder="Make"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" name="model" value={this.state.vehicle.model} onChange={this.onChange} placeholder="Model"/>
                                    </div>
                                    <div className="col-2">
                                        <input type="text" className="form-control" name="year" value={this.state.vehicle.year} onChange={this.onChange} placeholder="Year"/>
                                    </div>
                                </div>

                                <div><br/></div>

                                <div className="form-row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="rego" value={this.state.vehicle.rego} onChange={this.onChange} placeholder="Registration Number"/>
                                    </div>
                                </div>
                                <div><br/></div>

                                <div className="form-row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="fuel" value={this.state.vehicle.fuel} onChange={this.onChange} placeholder="Fuel Type"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="tank_size" value={this.state.vehicle.tank_size} onChange={this.onChange} placeholder="Tank Size"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="initials" value={this.state.vehicle.initials} onChange={this.onChange} placeholder="Initials"/>
                                    </div>
                                </div>


                                <div className="form-row">
                                    <MDBBtn type="submit" gradient="aqua">Save</MDBBtn>
                                    <MDBBtn onClick={this.onClear} gradient="peach">Clear</MDBBtn>
                                </div>

                            </form>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>

            </div>
        );
    };


}

export default Add;