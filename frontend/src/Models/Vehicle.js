import {Service} from "./Service"

export class Vehicle {
    _id;
    _make;
    _model;
    _release_year;
    _registration;
    _fuel;
    _tank_size;
    _initials;
    _created;
    _updated;
    _services = [];

    constructor(make, model, release_year, registration, fuel, tank_size, initials, id = null, created = null, updated = null) {
        this._id = id;
        this._make = make;
        this._model = model;
        this._release_year = release_year;
        this._registration = registration;
        this._fuel = fuel;
        this._tank_size = tank_size;
        this._initials = initials;
        this._created = created;
        this._updated = updated;
    }



    addService(newService) {
        this.services.push(newService);
    }


    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get make() {
        return this._make;
    }

    set make(value) {
        this._make = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    get release_year() {
        return this._release_year;
    }

    set release_year(value) {
        this._release_year = value;
    }

    get registration() {
        return this._registration;
    }

    set registration(value) {
        this._registration = value;
    }

    get fuel() {
        return this._fuel;
    }

    set fuel(value) {
        this._fuel = value;
    }

    get tank_size() {
        return this._tank_size;
    }

    set tank_size(value) {
        this._tank_size = value;
    }

    get initials() {
        return this._initials;
    }

    set initials(value) {
        this._initials = value;
    }

    get created() {
        return this._created;
    }

    set created(value) {
        this._created = value;
    }

    get updated() {
        return this._updated;
    }

    set updated(value) {
        this._updated = value;
    }



    get services() {
        return this._services;
    }

    set services(value) {
        this._services = value;
    }

    showDetails() {
        return ({
            'Vehicle': `${this.make} ${this.model} (${this.release_year})`,
            'Registration': `${this.registration}`,
            'Services': Service.getServices(this.services)
        })
    }

}