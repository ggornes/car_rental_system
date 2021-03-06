import axios from 'axios'

export const API = 'localhost:5000';

export const fetchData = async query => {
    const url = `${API}/search?query=${query}`;

    return await axios.get(url);
};


export const getVehicleById = async item => {
    try {
        return await axios.get(`vehicles/show/${item}`, { //note: I had to rewrite the @app.route on app.py
            headers: {"Content-type": "application/json"}
        });


    } catch (e) {
        return e;
    }

};

export const getServicesByVehicleId = async item => {
    try {
        return await axios.get(`vehicles/services/${item}`, { //note: I had to rewrite the @app.route on app.py
            headers: {"Content-type": "application/json"}
        });
    } catch (e) {
        return e;
    }
};


// creates an instance of a HTTP POST request
// term is the myVehicle
export const vehicle_add = term => {
    return axios
        .post(
            'http://localhost:5000/vehicles/add', {
                make: term.make,
                model: term.model,
                release_year: term.release_year,
                registration: term.registration,
                fuel: term.fuel,
                tank_size: term.tank_size,
                initials: term.initials
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Vehicle added to database");
            } else {
                alert("Error while trying to add new vehicle");
            }


        })
};

export const rental_add = term => {
  return axios
      .post(
          'http://localhost:5000/vehicles/rentals/add', {
              vehicle_id: term.vehicle_id,
              odometer_start: term.odometer_start,
              odometer_end: term.odometer_end,
              date_start: term.date_start,
              date_end: term.date_end,
              rental_type: term.rental_type
          }, {
              headers: { "Content-type": "application/json" }
          })
      .then((res) => {
          console.log(res);
          if (res.status === 200) {
              alert("Added new rental successfully");
              window.location.reload();
          } else {
              alert("Error while trying to add new rental");
          }
      })
};


export const fuelPurchase_add = term => {
    return axios
        .post(
            'http://localhost:5000/vehicles/fuel_purchase/add', {
                vehicle_id: term.vehicle_id,
                rental_id: term.rental_id,
                amount: term.amount,
                cost: term.cost
            }, {
                headers: {"Content-type": "application/json"}
            })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Added new fuel purchase successfully");
                window.location.reload();
            } else {
                alert("Error while trying to add new fuel purchase");
            }
        })
};

export const service_add = term => {
    return axios
        .post(
            'http://localhost:5000/vehicles/services/add', {
                vehicle_id: term.vehicle_id,
                odometer: term.odometer,
                serviced_at: term.serviced_at
            }, {
                headers: {"Content-type": "application/json"}
            })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Added new service successfully");
                window.location.reload();
            } else {
                alert("Error while trying to add new service");
            }
            })
};

export const vehicle_delete = term => {
    const r = window.confirm("Do you really want to delete this vehicle?");
    if (r === true) {
        axios
            .delete(
                `vehicles/delete/${term}`, {
                    headers: { "Content-type": "application/json" }
                })
            .then((res) => {
                console.log(res);
                alert("Vehicle deleted");
                window.location.reload();
            })
            .catch((res) => {
                console.log(res);
                alert("sqlalchemy.exc.IntegrityError: (MySQLdb._exceptions.IntegrityError) (1451, 'Cannot delete or update a parent row: a foreign key constraint fails (`rental_db_2`.`fuel_purchases`, CONSTRAINT `fuel_purchases_ibfk_1` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`))')\n" +
                    "[SQL: DELETE FROM vehicles WHERE vehicles.id = %s]" +
                    "Suggestion: delete from all tables where vehicle_id = %id before deleting from db.Vehicles");
            })
    }

};

export const vehicle_update = (term, id) => {
    return axios
        .put(
            `http://localhost:5000/vehicles/edit/${id}`, {
                make: term.make,
                model: term.model,
                release_year: term.release_year,
                registration: term.registration,
                fuel: term.fuel,
                tank_size: term.tank_size,
                initials: term.initials
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                alert("Updated vehicle");
            } else {
                alert("Error while trying to Edit vehicle");
            }
        })
};