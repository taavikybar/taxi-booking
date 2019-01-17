import Coordinate from './Coordinate';
import { getDistanceBetweenCoordinates, getNextCoordinateBySingleStep } from '../helper/CoordinateHelper';

export default class Car {
    public id: number;
    public isBooked: boolean = false;
    public currentPosition: Coordinate = new Coordinate(0, 0);
    public customerSource: Coordinate | undefined;
    public customerDestination: Coordinate | undefined;

    constructor(id: number) {
        this.id = id;
    }

    public reset(): void {
        this.currentPosition = new Coordinate(0, 0);
        this.isBooked = false;
        this.customerSource = undefined;
        this.customerDestination = undefined;
    }

    public book(customerSource: Coordinate, customerDestination: Coordinate): void {
        this.isBooked = true;
        this.customerSource = customerSource;
        this.customerDestination = customerDestination;
    }

    public getTravelLength(): number | undefined {
        if (!this.customerSource || !this.customerDestination) {
            return;
        }

        return getDistanceBetweenCoordinates(this.currentPosition, this.customerSource)
            + getDistanceBetweenCoordinates(this.customerSource, this.customerDestination);
    }

    public move(): void {
        if (!this.isBooked || !this.customerDestination) {
            return;
        }

        this.moveTowardsCustomerSource();
    }

    private moveTowardsCustomerSource(): void {
        if (!this.customerSource || this.currentPosition.isEqualTo(this.customerSource)) {
            this.customerSource = undefined;
            return this.moveTowardsCustomerDestination();
        }

        this.currentPosition = getNextCoordinateBySingleStep(this.currentPosition, this.customerSource);

        if (this.currentPosition.isEqualTo(this.customerSource)) {
            this.customerSource = undefined;
        }
    }

    private moveTowardsCustomerDestination(): void {
        if (!this.customerDestination || this.currentPosition.isEqualTo(this.customerDestination)) {
            return this.unBook();
        }

        this.currentPosition = getNextCoordinateBySingleStep(this.currentPosition, this.customerDestination);

        if (this.currentPosition.isEqualTo(this.customerDestination)) {
            this.unBook();
        }
    }

    private unBook(): void {
        this.customerDestination = undefined;
        this.isBooked = false;
    }
}
