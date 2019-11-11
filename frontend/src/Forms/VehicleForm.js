import React, {Component} from 'react';
import {updateItem} from "../VehicleFunctions";
import {MDBBtn} from "mdbreact";

class VehicleForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            vehicle: {
                id: this.props.item.id,
                make:this.props.item.make,
                model:this.props.item.model,
                release_year:this.props.item.release_year,
                registration: this.props.item.registration,
                fuel: this.props.item.fuel,
                tank_size: this.props.item.tank_size,
                initials: this.props.item.initials,
            }
        };

    }

    componentDidMount() {
        console.log("AAA", this.props.item)
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

        updateItem(this.state.vehicle, this.state.vehicle.id).then(() => {
            //this.getAll()
            // redirect
            // show success or error message
        })


    };

    onCancel = (e) => {
        // this.props.history.push("/browse");
    };


    render() {
        return (
            <form onSubmit={this.onSubmit}>

                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="make" value={this.state.vehicle.make}
                               onChange={this.onChange} placeholder="Make"/>
                    </div>
                    <div className="col-6">
                        <input type="text" className="form-control" name="model" value={this.state.vehicle.model}
                               onChange={this.onChange} placeholder="Model"/>
                    </div>
                    <div className="col-2">
                        <input type="text" className="form-control" name="release_year"
                               value={this.state.vehicle.release_year} onChange={this.onChange} placeholder="Year"/>
                    </div>
                </div>

                <div><br/></div>

                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="registration"
                               value={this.state.vehicle.registration} onChange={this.onChange}
                               placeholder="Registration Number"/>
                    </div>
                </div>
                <div><br/></div>

                <div className="form-row">
                    <div className="col-4">
                        <input type="text" className="form-control" name="fuel" value={this.state.vehicle.fuel}
                               onChange={this.onChange} placeholder="Fuel Type"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="tank_size"
                               value={this.state.vehicle.tank_size} onChange={this.onChange} placeholder="Tank Size"/>
                    </div>
                    <div className="col-4">
                        <input type="text" className="form-control" name="initials" value={this.state.vehicle.initials}
                               onChange={this.onChange} placeholder="Initials"/>
                    </div>
                </div>


                <div className="form-row">
                    <MDBBtn type="submit" gradient="aqua">Save</MDBBtn>
                    <MDBBtn onClick={this.onCancel} gradient="peach">Cancel</MDBBtn>
                </div>

            </form>

        );
    }

}

export default VehicleForm;
