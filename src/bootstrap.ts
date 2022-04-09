import dotenv from 'dotenv'
import app from './app';

//TODO dotenv simplify
dotenv.config();
const PORT = process.env.PORT || 3000;

process.on('SIGINT', (): void => {
  // Gracefully stop all the services
  app.stop();
  process.exit(0);
});

process.on('SIGTERM', (): void => {
  // Gracefully stop all the services
  app.stop();
  process.exit(0);
});

process.on('unhandledRejection', (error, p): void => {
  console.error(error, 'UNHANDLED_PROMISE_REJECTION', p);
});

process.on('uncaughtException', (error): void => {
  console.error(error);
  app.stop();
  process.exit(1);
});

// await untill all the staff started (db connection) and run
app.start(PORT as number);
