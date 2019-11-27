export class FuelPurchase {
    _id;
    _vehicle_id;
    _rental_id;
    _amount;
    _cost;
    _created;
    _updated;

    constructor(vehicle_id, rental_id, amount, cost, id = null, created = null, updated = null) {
        this._id = id;
        this._vehicle_id = vehicle_id;
        this._rental_id = rental_id;
        this._amount = amount;
        this._cost = cost;
        this._created = created;
        this._updated = updated;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get vehicle_id() {
        return this._vehicle_id;
    }

    set vehicle_id(value) {
        this._vehicle_id = value;
    }

    get rental_id() {
        return this._rental_id;
    }

    set rental_id(value) {
        this._rental_id = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get cost() {
        return this._cost;
    }

    set cost(value) {
        this._cost = value;
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



}