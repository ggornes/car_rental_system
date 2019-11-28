import mockAxios from 'axios';
import {getVehicleById, API} from "./VehicleFunctions"

// https://www.leighhalliday.com/mocking-axios-in-jest-testing-async-functions
// https://www.robinwieruch.de/axios-jest

describe('fetchData', () => {

    it ('Calls axios and returns vehicle details', async () => {



        // setup
        mockAxios.get.mockImplementationOnce(() =>
            Promise.resolve({
                data: { results: [
                        {
                            "id": 1,
                            "make": "Ariel555",
                            "model": "Atom 4",
                            "release_year": 2019,
                            "registration": "1ARI444",
                            "fuel": "Petrol",
                            "tank_size": 40.0,
                            "initials": "DC",
                            "created": "2019-11-23T14:32:20",
                            "updated": null
                        }
                    ] }

            })
        );


        // work
        const vehicle_details = await getVehicleById(1);

        // expect
        expect(vehicle_details).toEqual(
            {
                data: { results: [
                        {
                            "id": 1,
                            "make": "Ariel555",
                            "model": "Atom 4",
                            "release_year": 2019,
                            "registration": "1ARI444",
                            "fuel": "Petrol",
                            "tank_size": 40.0,
                            "initials": "DC",
                            "created": "2019-11-23T14:32:20",
                            "updated": null
                        }
                    ] }

            }
        );
        await expect(mockAxios.get).toHaveBeenCalledTimes(1);

        expect(mockAxios.get).toHaveBeenCalledWith(
            "vehicles/show/1",
            {

                headers: {"Content-type": "application/json"}

            }
        );

        //await expect(getVehicleById(1)).resolves.toEqual(data);


        console.log(vehicle_details.data.results);


        const mytest = getVehicleById(2);
        mytest.then(value => {
            console.log(value);
        })

    });




});

