import Car from './model/Car';
import Coordinate from './model/Coordinate';
import { isFirstCarCloserToCoordinateThanSecond, sortAscendingById } from './helper/CarHelper';

export default class App {
    private cars: Car[] = [];

    constructor() {
        this.cars.push(new Car(1));
        this.cars.push(new Car(2));
        this.cars.push(new Car(3));
    }

    public reset() {
        this.cars.forEach((car: Car) => car.reset());
    }

    public getCars() {
        return this.cars;
    }

    public moveCars(): void {
        this.cars.forEach((car: Car) => car.move());
    }

    public bookCar(source: Coordinate, destination: Coordinate): any {
        let availableCar: Car | undefined;

        this.cars
            .filter((car: Car) => !car.isBooked)
            .sort(sortAscendingById)
            .forEach((car: Car) => {
                if (isFirstCarCloserToCoordinateThanSecond(car, availableCar, source)) {
                    availableCar = car;
                }
            });

        if (availableCar) {
            availableCar.book(source, destination);

            return {
                car_id: availableCar.id,
                total_time: availableCar.getTravelLength(),
            };
        }

        return {};
    }
}
