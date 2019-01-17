import Car from '../model/Car';
import Coordinate from '../model/Coordinate';
import { getDistanceBetweenCoordinates } from './CoordinateHelper';

export const sortAscendingById = (car1: Car, car2: Car): number => car1.id - car2.id;

export const isFirstCarCloserToCoordinateThanSecond = (car1: Car, car2: Car | undefined, coordinate: Coordinate): boolean => {
    if (!car2) {
        return true;
    }

    const firstCarDistance: number = getDistanceBetweenCoordinates(car1.currentPosition, coordinate);
    const secondCarDistance: number = getDistanceBetweenCoordinates(car2.currentPosition, coordinate);

    return firstCarDistance < secondCarDistance;
};
