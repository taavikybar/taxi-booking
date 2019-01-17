import express from 'express';
import App from '../App';

export default (app: App) => (req: express.Request, res: express.Response) => {
    app.reset();

    res.json({
        message: 'Application reset',
        status: app.getCars(),
    });
};
