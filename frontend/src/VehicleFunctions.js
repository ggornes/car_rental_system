import axios from 'axios'

export const getVehicles = () => {
    return axios
        .get('vehicles/show', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = [];
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key];
                data.push([val.title, val.id])
            });

            return data
        })
};

export const getVehicleById = item => {
    return axios
        .get(`vehicles/show/${item}`,{
            headers: {"Content-type": "application/json"}
        })
        .then(res => {
            console.log(res.data[0]);
        })
};

export const addToList = term => {
    return axios
        .post(
            'vehicles/add', {
                make: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
};

// creates an instance of a HTTP POST request
// term is the myVehicle
export const addToList2 = term => {
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

export const addNewRental = term => {
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


export const addFuelPurchase = term => {
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

export const addService = term => {
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

export const deleteItem = term => {
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

export const updateItem = (term, id) => {
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