import Coordinate from '../../../lib/model/Coordinate';

const minPossibleValue: number = -2147483648;
const maxPossibleValue: number = 2147483647;

describe('Coordinate', () => {
    describe('constructor', () => {
        test('should create a coordinate with minimum x value if it is smaller than minimum possible value', () => {
            const coordinate: Coordinate = new Coordinate(minPossibleValue - 1, 0);

            expect(coordinate.x).toBe(minPossibleValue);
        });

        test('should create a coordinate with maximum x value if it is greater than maximum possible value', () => {
            const coordinate: Coordinate = new Coordinate(maxPossibleValue + 1, 0);

            expect(coordinate.x).toBe(maxPossibleValue);
        });

        test('should create a coordinate with minimum y value if it is smaller than minimum possible value', () => {
            const coordinate: Coordinate = new Coordinate(0, minPossibleValue - 1);

            expect(coordinate.y).toBe(minPossibleValue);
        });

        test('should create a coordinate with maximum y value if it is greater than maximum possible value', () => {
            const coordinate: Coordinate = new Coordinate(0, maxPossibleValue + 1);

            expect(coordinate.y).toBe(maxPossibleValue);
        });
    });

    describe('isEqualTo', () => {
        test('should return true if both coordinates x and y are equal to each other', () => {
            const coordinate1: Coordinate = new Coordinate(5, 6);
            const coordinate2: Coordinate = new Coordinate(5, 6);

            expect(coordinate1.isEqualTo(coordinate2)).toBe(true);
        });

        test('should return false if x or y of coordinates is not equal to each other', () => {
            const coordinate1: Coordinate = new Coordinate(3, 6);
            const coordinate2: Coordinate = new Coordinate(5, 6);

            expect(coordinate1.isEqualTo(coordinate2)).toBe(false);
        });

        test('should return false if x and y of coordinates are not equal to each other', () => {
            const coordinate1: Coordinate = new Coordinate(3, 2);
            const coordinate2: Coordinate = new Coordinate(5, 6);

            expect(coordinate1.isEqualTo(coordinate2)).toBe(false);
        });
    });
});
