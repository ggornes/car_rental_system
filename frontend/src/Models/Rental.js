export class Rental {
    _id;
    _vehicle_id;
    _odometer_start;
    _odometer_end;
    _date_start;
    _date_end;
    _rental_type;
    _created;
    _updated;

    constructor(vehicle_id, odometer_start, odometer_end, date_start, date_end, rental_type, id = null, created = null, updated = null) {
        this._id = id;
        this._vehicle_id = vehicle_id;
        this._odometer_start = odometer_start;
        this._odometer_end = odometer_end;
        this._date_start = date_start;
        this._date_end = date_end;
        this._rental_type = rental_type;
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

    get odometer_start() {
        return this._odometer_start;
    }

    set odometer_start(value) {
        this._odometer_start = value;
    }

    get odometer_end() {
        return this._odometer_end;
    }

    set odometer_end(value) {
        this._odometer_end = value;
    }

    get date_start() {
        return this._date_start;
    }

    set date_start(value) {
        this._date_start = value;
    }

    get date_end() {
        return this._date_end;
    }

    set date_end(value) {
        this._date_end = value;
    }

    get rental_type() {
        return this._rental_type;
    }

    set rental_type(value) {
        this._rental_type = value;
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