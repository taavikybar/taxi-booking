import Coordinate from '../../../lib/model/Coordinate';
import { getDistanceBetweenCoordinates, getNextCoordinateBySingleStep } from '../../../lib/helper/CoordinateHelper';

describe('CoordinateHelper', () => {
    describe('getDistanceBetweenCoordinates', () => {
        test('should return correct distance between 2 coordinates', () => {
            const coordinate1: Coordinate = new Coordinate(2, 5);
            const coordinate2: Coordinate = new Coordinate(8, 10);

            expect(getDistanceBetweenCoordinates(coordinate1, coordinate2)).toBe(11);
        });

        test('should return correct distance between 2 coordinates if one is negative', () => {
            const coordinate1: Coordinate = new Coordinate(2, 5);
            const coordinate2: Coordinate = new Coordinate(-7, -10);

            expect(getDistanceBetweenCoordinates(coordinate1, coordinate2)).toBe(24);
        });

        test('should return correct distance between 2 coordinates if both are negative', () => {
            const coordinate1: Coordinate = new Coordinate(-2, -5);
            const coordinate2: Coordinate = new Coordinate(-1, -10);

            expect(getDistanceBetweenCoordinates(coordinate1, coordinate2)).toBe(6);
        });
    });

    describe('getNextCoordinateBySingleStep', () => {
        test('should return current cooordinate if both coordinates are the same', () => {
            const currentCoordinate: Coordinate = new Coordinate(-2, -5);
            const destinationCoordinate: Coordinate = new Coordinate(-2, -5);

            const newCoordinate = getNextCoordinateBySingleStep(currentCoordinate, destinationCoordinate);

            expect(newCoordinate.isEqualTo(currentCoordinate)).toBe(true);
        });

        test('should return new coordinate with x incremented if current x is not equal to destination x', () => {
            const currentCoordinate: Coordinate = new Coordinate(1, 8);
            const destinationCoordinate: Coordinate = new Coordinate(4, -5);

            const newCoordinate = getNextCoordinateBySingleStep(currentCoordinate, destinationCoordinate);
            const expectedCoordinate = new Coordinate(2, 8);

            expect(newCoordinate.isEqualTo(expectedCoordinate)).toBe(true);
        });

        test(`should return new coordinate with x decremented if current x is not equal to destination x
            and current x is greater than destination x`, () => {
            const currentCoordinate: Coordinate = new Coordinate(8, 8);
            const destinationCoordinate: Coordinate = new Coordinate(4, -5);

            const newCoordinate = getNextCoordinateBySingleStep(currentCoordinate, destinationCoordinate);
            const expectedCoordinate = new Coordinate(7, 8);

            expect(newCoordinate.isEqualTo(expectedCoordinate)).toBe(true);
        });

        test('should return new coordinate with y incremented if current x is equal to destination x', () => {
            const currentCoordinate: Coordinate = new Coordinate(4, 2);
            const destinationCoordinate: Coordinate = new Coordinate(4, 8);

            const newCoordinate = getNextCoordinateBySingleStep(currentCoordinate, destinationCoordinate);
            const expectedCoordinate = new Coordinate(4, 3);

            expect(newCoordinate.isEqualTo(expectedCoordinate)).toBe(true);
        });

        test(`should return new coordinate with x decremented if current x is equal to destination x
            and current y is greater than destination y`, () => {
            const currentCoordinate: Coordinate = new Coordinate(4, 8);
            const destinationCoordinate: Coordinate = new Coordinate(4, -5);

            const newCoordinate = getNextCoordinateBySingleStep(currentCoordinate, destinationCoordinate);
            const expectedCoordinate = new Coordinate(4, 7);

            expect(newCoordinate.isEqualTo(expectedCoordinate)).toBe(true);
        });
    });
});
