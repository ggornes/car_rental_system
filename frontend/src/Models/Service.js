export class Service {
    _id;
    _vehicle_id;
    _odometer;
    _serviced_at;
    _created;
    _updated;

    constructor(vehicle_id, odometer, serviced_at, id = null, createdAt = null, updatedAt = null) {
        this._id = id;
        this._vehicle_id = vehicle_id;
        this._odometer = odometer;
        this._serviced_at = serviced_at;
        this._created = createdAt;
        this._updated = updatedAt;
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

    get odometer() {
        return this._odometer;
    }

    set odometer(value) {
        this._odometer = value;
    }

    get serviced_at() {
        return this._serviced_at;
    }

    set serviced_at(value) {
        this._serviced_at = value;
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

    static getServices = services => {
        return services.length;
    }

}