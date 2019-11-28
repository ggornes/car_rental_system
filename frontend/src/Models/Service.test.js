import {Service} from "./Service";

describe ('Service', () => {
    it('calculates the number of services done', () => {
        const services = [
            new Service('dummy_id', 500, '2018-01-01'),
            new Service('dummy_id', 1000, '2018-02-01'),
            new Service('dummy_id', 2000, '2018-03-01')
        ];

        const expected = 3;
        const actual = Service.getServices(services);

        expect(actual).toBe(expected);

    });

    it('calculates the last service odometer correctly', () => {
        const services = [
            new Service('dummy_id', 500, '2018-01-01'),
            new Service('dummy_id', 1000, '2018-02-01'),
            new Service('dummy_id', 5000, '2017-02-01'),
            new Service('dummy_id', 2000, '2018-03-01')
        ];

        // sort services descending odometer
        const services2 = services.sort(function (a, b) {
            return b.odometer - a.odometer;
        });

        const expected = 5000;
        const actual = Service.getLastServiceOdo(services2);

        expect(actual).toBe(expected);

    })

});