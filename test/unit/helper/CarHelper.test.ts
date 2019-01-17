
import Car from '../../../lib/model/Car';
import { isFirstCarCloserToCoordinateThanSecond, sortAscendingById } from '../../../lib/helper/CarHelper';
import Coordinate from '../../../lib/model/Coordinate';

describe('CarHelper', () => {
    describe('sortAscendingById', () => {
        test('should return positive number if first car id is greater than second car id', () => {
            const firstCar: Car = new Car(3);
            const secondCar: Car = new Car(1);

            expect(sortAscendingById(firstCar, secondCar)).toBe(2);
        });

        test('should return negative number if first car id is smaller than second car id', () => {
            const firstCar: Car = new Car(1);
            const secondCar: Car = new Car(3);

            expect(sortAscendingById(firstCar, secondCar)).toBe(-2);
        });

        test('should return zero if first car id is the same as second car id', () => {
            const firstCar: Car = new Car(3);
            const secondCar: Car = new Car(3);

            expect(sortAscendingById(firstCar, secondCar)).toBe(0);
        });
    });

    describe('isFirstCarCloserToCoordinateThanSecond', () => {
        test('should return true if second car is undefined', () => {
            const firstCar: Car = new Car(1);
            const coordinate: Coordinate = new Coordinate(1, 2);

            expect(isFirstCarCloserToCoordinateThanSecond(firstCar, undefined, coordinate)).toBe(true);
        });

        test('should return true if first car is closer to coordinate', () => {
            const firstCar: Car = new Car(1);
            const secondCar: Car = new Car(2);
            const coordinate: Coordinate = new Coordinate(4, 5);

            firstCar.currentPosition = new Coordinate(6, 7);

            expect(isFirstCarCloserToCoordinateThanSecond(firstCar, secondCar, coordinate)).toBe(true);
        });

        test('should return false if second car is closer to coordinate', () => {
            const firstCar: Car = new Car(1);
            const secondCar: Car = new Car(2);
            const coordinate: Coordinate = new Coordinate(4, 5);

            secondCar.currentPosition = new Coordinate(6, 7);

            expect(isFirstCarCloserToCoordinateThanSecond(firstCar, secondCar, coordinate)).toBe(false);
        });
    });
});
