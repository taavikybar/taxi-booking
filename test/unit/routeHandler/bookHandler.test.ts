import App from '../../../lib/App';
import bookHandler from '../../../lib/routeHandler/bookHandler';
import Car from '../../../lib/model/Car';
import Coordinate from '../../../lib/model/Coordinate';

describe('routeHandlers', () => {
    const app: App = new App();
    let requestMock: any = jest.fn();
    let responseMock: any;

    describe('bookHandler', () => {
        beforeEach(() => {
            responseMock = {
                json: jest.fn(),
            };

            app.reset();
        });

        test('should call express response.json() with empty object if no car is available', () => {
            const mockPayload: any = {
                source: {
                    x: 1,
                    y: 2,
                },
                destination: {
                    x: 5,
                    y: 6,
                },
            };
            requestMock = {
                body: mockPayload,
            };
            const expectedJson: any = {
                car_id: 1,
                total_time: 11,
            };

            const bookRouteHandler: (req: any, res: any) => void = bookHandler(app);

            bookRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith(expectedJson);
        });

        test(`should call express response.json() with the correct json data containing
            message if not car is available`, () => {
            const mockPayload: any = {
                source: {
                    x: 1,
                    y: 2,
                },
                destination: {
                    x: 5,
                    y: 6,
                },
            };

            requestMock = {
                body: mockPayload,
            };

            app.getCars().forEach((car: Car) => car.book(new Coordinate(1, 2), new Coordinate(4, 5)));

            const bookRouteHandler: (req: any, res: any) => void = bookHandler(app);

            bookRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith({});
        });

        test(`should call express response.json() with the correct json data containing
            message if payload is invalid`, () => {
            const mockPayload: any = {};
            const expectedJson: any = {
                message: 'Invalid data given',
            };

            requestMock = {
                body: mockPayload,
            };

            const bookRouteHandler: (req: any, res: any) => void = bookHandler(app);

            bookRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith(expectedJson);
        });
    });
});
