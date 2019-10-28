import React, {Component} from 'react';
import ReactDom from 'react-dom';

import {Link} from 'react-router-dom';
import {addToList, addToList2} from "../../VehicleFunctions";

class Add extends Component {

    constructor(props) {
        super();

        // is there something like
        // this.state = new Vehicle(params) ?
        //
        // create an empty instance of vehicle class
        this.state = {
            make:'',
            model:'',
            year:'',
            rego: '',
            fuel: '',
            tank_size: '',
            initials: ''
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

        // should be something like:
        // const myVehicle = new Vehicle(params);
        //
        // create an instance of a Vehicle class ?
        //

        console.log(myVehicle);


        // calls /src/VehicleFunctions
        //
        addToList2(myVehicle).then(() => {
            //this.getAll()
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
        // creating vehicle object
        // binding with the html elements
        return(
            <div className="container">
                <h4>
                    <Link to="/dashboard">Vehicles</Link>
                </h4>

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="make">Make:</label>
                        <input type="text"
                               className="form-control"
                               name="make"
                               value={make}
                               onChange={this.onChange}
                               placeholder="Make"/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="model">Model:</label>
                        <input type="text"
                               className="form-control"
                               name="model"
                               value={model}
                               onChange={this.onChange}
                               placeholder="Model"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year:</label>
                        <input type="text"
                               className="form-control"
                               name="year"
                               value={year}
                               onChange={this.onChange}
                               placeholder="year"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="rego">Rego:</label>
                        <input type="text"
                               className="form-control"
                               name="rego"
                               value={rego}
                               onChange={this.onChange}
                               placeholder="rego"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="fuel">Fuel Type:</label>
                        <input type="text"
                               className="form-control"
                               name="fuel"
                               value={fuel}
                               onChange={this.onChange}
                               placeholder="Fuel Type"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="tank_size">Tank Size:</label>
                        <input type="text"
                               className="form-control"
                               name="tank_size"
                               value={tank_size}
                               onChange={this.onChange}
                               placeholder="Tank Size"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="initials">Initials:</label>
                        <input type="text"
                               className="form-control"
                               name="initials"
                               value={initials}
                               onChange={this.onChange}
                               placeholder="Initials"/>

                    </div>




                    <button type="submit" className="btn btn-primary">
                        Save
                    </button>
                </form>

            </div>
        );
    };


}

export default Add;