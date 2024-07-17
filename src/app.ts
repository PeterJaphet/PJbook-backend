import express from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config';
import userRoutes from '../src/routes/userRoutes';

import swaggerDocs from './utils/swagger';

import bookRoutes from '../src/routes/bookRoutes';
import fileUpload from 'express-fileupload';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import { auth } from './middleware/auth';

const createApp = () => {
  const app = express();
  app.use(
    cors({
      credentials: true,
    })
  );

  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  swaggerDocs(app, 5000);

  app.get('/', (req, res) => res.send('Welcome to PJ Books Backend!'));
  app.use('/users', userRoutes);
  app.use('/book', auth(), bookRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};

export default createApp;
