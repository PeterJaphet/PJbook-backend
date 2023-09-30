import express from 'express'
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import 'dotenv/config'
import userRoutes from '../src/routes/userRoutes'
import { notFound, errorHandler } from './middleware/errorMiddleware';
import connectDB from './config/db';
import createApp from './app';
import logger from './utils/logger';


connectDB();

const port = process.env.PORT || 5000

const app = createApp();

const server = http.createServer(app);

server.listen(port, ()=>{
    logger.info(`Server runnig on http://localhost:${port}`)
})