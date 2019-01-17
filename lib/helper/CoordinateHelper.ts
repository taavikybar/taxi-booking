import Coordinate from '../model/Coordinate';

export const getDistanceBetweenCoordinates = (coordinate1: Coordinate, coordinate2: Coordinate): number =>
    Math.abs(coordinate1.x - coordinate2.x) + Math.abs(coordinate1.y - coordinate2.y);

export const getNextCoordinateBySingleStep = (currentCoordinate: Coordinate, destinationCoordinate: Coordinate): Coordinate => {
    const currentX: number = currentCoordinate.x;
    const currentY: number = currentCoordinate.y;
    const destinationX: number = destinationCoordinate.x;
    const destinationY: number = destinationCoordinate.y;

    if (currentCoordinate.isEqualTo(destinationCoordinate)) {
        return currentCoordinate;
    }

    let newX: number = currentX;
    let newY: number = currentY;

    if (currentX !== destinationX) {
        newX = getNewPoint(currentX, destinationX);
    } else {
        newY = getNewPoint(currentY, destinationY);
    }

    return new Coordinate(newX, newY);
};

const getNewPoint = (currentPoint: number, destinationPoint: number): number =>
    currentPoint > destinationPoint ? currentPoint - 1 : currentPoint + 1;
