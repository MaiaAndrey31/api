import 'dotenv/config';
import cors from 'cors';
import express, { json } from 'express';

import { setupMongo } from './database';
import { errorHandler } from './middleware/errorHandlerMiddleware';
import { routes } from './routes';

setupMongo().then(() => {
  const app = express();

  app.use(
    cors({
      origin: process.env.FRONT_URL,
    }),
  );
  app.use(json());
  app.use(routes);
  app.use(errorHandler);

  app.listen(3131, () => console.log('🚀 server online'));
});
