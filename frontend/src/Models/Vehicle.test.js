import {Vehicle} from "./Vehicle";
import {Service} from "./Service";

describe ('Vehicle', () => {
    it('Show the correct vehicle details', () => {
        const vehicles = [
            new Vehicle('Honda', 'Civic', '2013', '1QWE123', '45', 'Petrol', 'test'),
            new Vehicle('BMW', 'X3', '2014', '1QWE123', '45', 'Petrol', 'test')
        ];

        const expected = 'Honda Civic (2013)';
        const actual = vehicles[0].showDetails().Vehicle;

        expect(actual).toBe(expected);

    });

    it('calculates the number of services done', () => {
        const services = [
            new Service('dummy_id', 500, '2018-01-01'),
            new Service('dummy_id', 1000, '2018-02-01'),
            new Service('dummy_id', 2000, '2018-03-01')
        ];

        const vehicles = [
            new Vehicle('Honda', 'Civic', '2013', '1QWE123', '45', 'Petrol', 'test'),
            new Vehicle('BMW', 'X3', '2014', '1QWE123', '45', 'Petrol', 'test')
        ];

        vehicles[0].addService(services[0]);
        vehicles[0].addService(services[1]);
        vehicles[0].addService(services[2]);


        const expected = 3;
        const actual = vehicles[0].showDetails().Services;

        expect(actual).toBe(expected);

    });


});