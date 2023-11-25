import http from 'http';
import 'dotenv/config';
import connectDB from './config/db';
import createApp from './app';
import logger from './utils/logger';
import swaggerDocs from './utils/swagger';
connectDB();

const port = process.env.PORT || 5000;

const app = createApp();

const server = http.createServer(app);

server.listen(port, () => {
  logger.info(`Server runnig on http://localhost:${port}`);
});
