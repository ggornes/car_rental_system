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

export const addToList = term => {
    return axios
        .post(
            'vehicles/addd', {
                make: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
};

export const addToList2 = term => {
    return axios
        .post(
            'vehicles/add', {
                make: term.make,
                model: term.model,
                release_year: term.year,
                registration: term.rego,
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
            `api/task/${id}`, {
                title: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
};