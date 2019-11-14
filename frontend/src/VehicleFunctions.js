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
            console.log(res)
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
          console.log(res)
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
            console.log(res)
        })
};

export const deleteItem = term => {
    axios
        .delete(
            `vehicles/delete/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
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
            console.log(res)
        })
};