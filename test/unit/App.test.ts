import Car from '../../lib/model/Car';
import App from '../../lib/App';
import Coordinate from '../../lib/model/Coordinate';

describe('App', () => {
    const app: App = new App();

    beforeEach(() => {
        app.reset();
    });

    describe('constructor', () => {
        test('should create and add 3 cars to cars array when constructed', () => {
            const appCars: Car[] = app.getCars();

            expect(appCars.length).toBe(3);
            expect(appCars[0].id).toBe(1);
            expect(appCars[1].id).toBe(2);
            expect(appCars[2].id).toBe(3);
        });
    });

    describe('reset', () => {
        test('should reset all cars to original position', () => {
            const appCars: Car[] = app.getCars();
            const expectedPosition: Coordinate = new Coordinate(0, 0);

            appCars[0].currentPosition = new Coordinate(1, 2);
            appCars[1].currentPosition = new Coordinate(5, 4);
            appCars[2].currentPosition = new Coordinate(2, 7);

            app.reset();

            expect(appCars[0].currentPosition.isEqualTo(expectedPosition)).toBe(true);
            expect(appCars[1].currentPosition.isEqualTo(expectedPosition)).toBe(true);
            expect(appCars[2].currentPosition.isEqualTo(expectedPosition)).toBe(true);
        });
    });

    describe('moveCars', () => {
        test('should move all booked cars by 1 step', () => {
            const appCars: Car[] = app.getCars();
            const customerSource: Coordinate = new Coordinate(1, 2);
            const customerDestination: Coordinate = new Coordinate(4, 5);

            appCars[0].currentPosition = new Coordinate(1, 2);
            appCars[1].currentPosition = new Coordinate(5, 4);
            appCars[2].currentPosition = new Coordinate(2, 7);

            appCars[1].book(customerSource, customerDestination);

            app.moveCars();

            expect(appCars[0].currentPosition.isEqualTo(new Coordinate(1, 2))).toBe(true);
            expect(appCars[1].currentPosition.isEqualTo(new Coordinate(4, 4))).toBe(true);
            expect(appCars[2].currentPosition.isEqualTo(new Coordinate(2, 7))).toBe(true);
        });
    });

    describe('bookCar', () => {
        test('should return empty object if no car is available', () => {
            const appCars: Car[] = app.getCars();
            const customerSource: Coordinate = new Coordinate(1, 2);
            const customerDestination: Coordinate = new Coordinate(4, 5);

            appCars[0].currentPosition = new Coordinate(1, 2);
            appCars[1].currentPosition = new Coordinate(5, 4);
            appCars[2].currentPosition = new Coordinate(2, 7);

            appCars[0].book(customerSource, customerDestination);
            appCars[1].book(customerSource, customerDestination);
            appCars[2].book(customerSource, customerDestination);

            const response: any = app.bookCar(customerSource, customerDestination);

            expect(response).toEqual({});
        });

        test('should return unbooked car that is closest to customer source', () => {
            const appCars: Car[] = app.getCars();
            const customerSource: Coordinate = new Coordinate(1, 2);
            const customerDestination: Coordinate = new Coordinate(4, 5);

            appCars[0].currentPosition = new Coordinate(1, 2);
            appCars[1].currentPosition = new Coordinate(5, 4);
            appCars[2].currentPosition = new Coordinate(2, 3);

            appCars[0].book(customerSource, customerDestination);

            const response: any = app.bookCar(customerSource, customerDestination);

            const expectedResponse: any = {
                car_id: 3,
                total_time: 8,
            };

            expect(response).toEqual(expectedResponse);
        });

        test('should return unbooked car with the lowest id if both cars are equally close to customer source', () => {
            const appCars: Car[] = app.getCars();
            const customerSource: Coordinate = new Coordinate(1, 2);
            const customerDestination: Coordinate = new Coordinate(4, 5);

            appCars[0].currentPosition = new Coordinate(1, 2);
            appCars[1].currentPosition = new Coordinate(0, 1);
            appCars[2].currentPosition = new Coordinate(2, 3);

            appCars[0].book(customerSource, customerDestination);

            const response: any = app.bookCar(customerSource, customerDestination);

            const expectedResponse: any = {
                car_id: 2,
                total_time: 8,
            };

            expect(response).toEqual(expectedResponse);
        });
    });
});
