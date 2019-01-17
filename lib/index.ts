import express from 'express';
import bodyParser from 'body-parser';

import App from './App';
import bookHandler from './routeHandler/bookHandler';
import tickHandler from './routeHandler/tickHandler';
import resetHandler from './routeHandler/resetHandler';
import statusHandler from './routeHandler/statusHandler';

const port = 8080;
const server = express();

const app = new App();

server.use(bodyParser.json());

server.post('/api/book', bookHandler(app));
server.use('/api/tick', tickHandler(app));
server.use('/api/reset', resetHandler(app));
server.use('/api/status', statusHandler(app));

server.listen(port, (err: any) => {
    if (err) {
        return console.log(err); // tslint:disable-line no-console
    }

    return console.log(`server is listening on ${port}`); // tslint:disable-line no-console
});
