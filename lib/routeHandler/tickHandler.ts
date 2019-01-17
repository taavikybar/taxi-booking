import express from 'express';
import App from '../App';

export default (app: App) => (req: express.Request, res: express.Response) => {
    app.moveCars();

    res.json({
        message: 'Cars moved by 1 unit',
        status: app.getCars(),
    });
};
