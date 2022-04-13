import { Server } from 'http';
import express, { Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import db from './db/db';
import dbBootstrap from './db/db-bootstrap';

import hotelRouter from './routes/hotels';
import bookingRouter from './routes/booking';

const app: Application = express();
const swaggerDocument = YAML.load('./doc/api.yaml');
let server: Server;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(hotelRouter);
app.use(bookingRouter);
//TODO Error handler middleware

export default {
  async start(port: number): Promise<Server> {
    server = app.listen(port, () => {
      console.log(`Server is listening on 3000 port`);
    });

    await db.connect();
    await dbBootstrap.createSchema();

    return server;
  },

  async stop(cb?: (err?: Error) => void): Promise<Server> {
    console.log(`\nTrying to close the server..\n`);

    await db.disconnect(cb);

    return server.close(cb);
  },
};