export default class Coordinate {
    public x: number;
    public y: number;

    /**
     * Constructs a coordinate which fits into a 2D grid of 32bit signed integer values.
     * If a coordinate cannot fit on the plane, it's x or y is set to the minimum possible value.
     *
     * @param x - abscissa
     * @param y - ordinate
     */
    constructor(x: number, y: number) {
        const min: number = -2147483648;
        const max: number = 2147483647;

        if (x < min) {
            this.x = min;
        } else if (x > max) {
            this.x = max;
        } else {
            this.x = x;
        }

        if (y < min) {
            this.y = min;
        } else if (y > max) {
            this.y = max;
        } else {
            this.y = y;
        }
    }

    public isEqualTo(coordinate: Coordinate): boolean {
        return this.x === coordinate.x && this.y === coordinate.y;
    }
}
