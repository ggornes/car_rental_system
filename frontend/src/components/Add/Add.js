import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Link} from 'react-router-dom';
import {addToList, addToList2} from "../../VehicleFunctions";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


class Add extends Component {

    constructor(props) {
        super(props);

        this.state = {
            make:'',
            model:'',
            year:'',
            rego: '',
            fuel: '',
            tank_size: '',
            initials: '',
            vehicle: {
                make:'',
                model:'',
                year:'',
                rego: '',
                fuel: '',
                tank_size: '',
                initials: '',
            }
        }
    }


    onChange = (e) => {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    };

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
        const {make, model, year, rego, fuel, tank_size, initials} = this.state;
        const myVehicle = {make, model, year, rego, fuel, tank_size, initials};
        console.log(myVehicle);

        addToList2(myVehicle).then(() => {
            //this.getAll()
            // redirect
        })


/*
        this.ref.add({
            make,
            model,
            release_year
        }).then((docRef)=>{
            this.setState({
                make:'',
                model:'',
                release_year:''
            });

            this.props.history.push("/");
        });

 */
    };

    render() {
        const {make, model, year, rego, fuel, tank_size, initials} = this.state;
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
                                        <input type="text" className="form-control" name="make" value={make} onChange={this.onChange} placeholder="Make"/>
                                    </div>
                                    <div className="col-6">
                                        <input type="text" className="form-control" name="model" value={model} onChange={this.onChange} placeholder="Model"/>
                                    </div>
                                    <div className="col-2">
                                        <input type="text" className="form-control" name="year" value={year} onChange={this.onChange} placeholder="Year"/>
                                    </div>
                                </div>

                                <div><br/></div>

                                <div className="form-row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="rego" value={rego} onChange={this.onChange} placeholder="Registration Number"/>
                                    </div>
                                </div>
                                <div><br/></div>

                                <div className="form-row">
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="fuel" value={fuel} onChange={this.onChange} placeholder="Fuel Type"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="tank_size" value={tank_size} onChange={this.onChange} placeholder="Tank Size"/>
                                    </div>
                                    <div className="col-4">
                                        <input type="text" className="form-control" name="initials" value={initials} onChange={this.onChange} placeholder="Initials"/>
                                    </div>
                                </div>


                                <div className="form-row">
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
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