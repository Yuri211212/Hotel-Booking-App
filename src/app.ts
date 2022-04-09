import { Server } from 'http';
import express, { Application } from 'express';
import db from './db/db';
import dbBootstrap from './db/db-bootstrap';

import hotelRouter from './routes/hotels';
import bookingRouter from './routes/booking';

const app: Application = express();
let server: Server;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use(hotelRouter);
app.use(bookingRouter);

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