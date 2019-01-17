import App from '../../../lib/App';
import tickHandler from '../../../lib/routeHandler/tickHandler';
import resetHandler from '../../../lib/routeHandler/resetHandler';
import statusHandler from '../../../lib/routeHandler/statusHandler';

describe('routeHandlers', () => {
    const app: App = new App();
    const requestMock: any = jest.fn();
    let responseMock: any;

    beforeEach(() => {
        responseMock = {
            json: jest.fn(),
        };
    });

    describe('resetHandler', () => {
        test('should call express response.json() with the correct json data containing message and status', () => {
            const expectedJson: any = {
                message: 'Application reset',
                status: app.getCars(),
            };

            const resetRouteHandler: (req: any, res: any) => void = resetHandler(app);

            resetRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith(expectedJson);
        });
    });

    describe('tickHandler', () => {
        test('should call express response.json() with the correct json data containing message and status', () => {
            const expectedJson: any = {
                message: 'Cars moved by 1 unit',
                status: app.getCars(),
            };

            const tickRouteHandler: (req: any, res: any) => void = tickHandler(app);

            tickRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith(expectedJson);
        });
    });

    describe('statusHandler', () => {
        test('should call express response.json() with the correct json data containing message and status', () => {
            const expectedJson: any = {
                message: 'Current status',
                status: app.getCars(),
            };

            const statusRouteHandler: (req: any, res: any) => void = statusHandler(app);

            statusRouteHandler(requestMock, responseMock);

            expect(responseMock.json).toHaveBeenCalledTimes(1);
            expect(responseMock.json).toHaveBeenCalledWith(expectedJson);
        });
    });
});
