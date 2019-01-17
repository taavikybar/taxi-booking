import express from 'express';
import App from '../App';

export default (app: App) => (req: express.Request, res: express.Response) => {
    res.json({
        message: 'Current status',
        status: app.getCars(),
    });
};
