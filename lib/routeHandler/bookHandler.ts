import express from 'express';
import App from '../App';
import Coordinate from '../model/Coordinate';

export default (app: App) => (req: express.Request, res: express.Response) => {
    const payload = req.body;

    if (payload && payload.source && payload.destination) {
        const customerSource: Coordinate = new Coordinate(payload.source.x, payload.source.y);
        const customerDestination: Coordinate = new Coordinate(payload.destination.x, payload.destination.y); // add checks here

        const response = app.bookCar(customerSource, customerDestination);

        return res.json(response);
    }

    res.json({
        message: 'Invalid data given',
    });
};
