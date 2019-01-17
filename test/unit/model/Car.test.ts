import Car from '../../../lib/model/Car';
import Coordinate from '../../../lib/model/Coordinate';

describe('Car', () => {
    const car: Car = new Car(1);

    describe('reset', () => {
        test('should reset currentPosition, isBooked, customerSource and customerDestination', () => {
            car.book(new Coordinate(1, 2), new Coordinate(3, 4));
            car.reset();

            expect(car.isBooked).toBe(false);
            expect(car.currentPosition.isEqualTo(new Coordinate(0, 0))).toBe(true);
            expect(car.customerSource).toBe(undefined);
            expect(car.customerDestination).toBe(undefined);
        });
    });

    describe('book', () => {
        test('should set isBooked to true, customerSource and customerDestination to respective value when car is booked', () => {
            const customerSource: Coordinate = new Coordinate(1, 2);
            const customerDestination: Coordinate = new Coordinate(4, 5);
            const expectedCustomerSource: Coordinate = new Coordinate(1, 2);
            const expectedCustomerDestination: Coordinate = new Coordinate(4, 5);

            car.book(customerSource, customerDestination);

            expect(car.isBooked).toBe(true);
            expect(car.customerSource!.isEqualTo(expectedCustomerSource)).toBe(true);
            expect(car.customerDestination!.isEqualTo(expectedCustomerDestination)).toBe(true);
        });
    });

    describe('getTravelLength', () => {
        test('should return from the function if customerSource is undefined', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);
            car.customerSource = undefined;

            expect(car.getTravelLength()).toBe(undefined);
        });

        test('should return from the function if customerDestination is undefined', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);
            car.customerDestination = undefined;

            expect(car.getTravelLength()).toBe(undefined);
        });

        test('should return correct travel length', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);

            expect(car.getTravelLength()).toBe(6);
        });
    });

    describe('move', () => {
        test('should return from the function if isBooked is false', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);
            car.isBooked = false;

            expect(car.move()).toBe(undefined);
        });

        test('should return from the function if customerDestination is not set', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);
            car.customerDestination = undefined;

            expect(car.move()).toBe(undefined);
        });

        test('should move car one step closer to customer source', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);
            const expectedPosition: Coordinate = new Coordinate(3, 5);

            car.currentPosition = new Coordinate(4, 5);
            car.book(customerSource, customerDestination);
            car.move();

            expect(car.currentPosition.isEqualTo(expectedPosition)).toBe(true);
        });

        test('should move car to customer source if one step away from it', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(3, 5);
            car.book(customerSource, customerDestination);
            car.move();

            expect(car.currentPosition.isEqualTo(customerSource)).toBe(true);
        });

        test('should move car one step closer to customer destination if source is reached', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);
            const expectedPosition: Coordinate = new Coordinate(2, 4);

            car.currentPosition = new Coordinate(3, 4);
            car.book(customerSource, customerDestination);
            car.move();

            expect(car.currentPosition.isEqualTo(expectedPosition)).toBe(true);
            expect(car.customerSource).toBe(undefined);
        });

        test('should unbook car if customer destination is reached', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(1, 2);
            car.book(customerSource, customerDestination);
            car.customerSource = undefined;
            car.move();

            expect(car.currentPosition.isEqualTo(customerDestination)).toBe(true);
            expect(car.isBooked).toBe(false);
            expect(car.customerDestination).toBe(undefined);
        });

        test('should move car one step closer to customer destination and unbook car if destination is reached', () => {
            const customerSource: Coordinate = new Coordinate(3, 4);
            const customerDestination: Coordinate = new Coordinate(1, 2);

            car.currentPosition = new Coordinate(2, 2);
            car.book(customerSource, customerDestination);
            car.customerSource = undefined;
            car.move();

            expect(car.currentPosition.isEqualTo(customerDestination)).toBe(true);
            expect(car.isBooked).toBe(false);
            expect(car.customerDestination).toBe(undefined);
        });
    });
});
