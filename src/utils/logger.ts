import pino from 'pino';
import dayjs from 'dayjs';
//@ts-ignore
import nrPino from '@newrelic/pino-enricher';

const logger = pino({
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          targets: [
            {
              target: 'pino-pretty',
              level: 'debug',
              options: {
                colorize: true,
                ignore: 'pid,hostname',
              },
            },
          ],
        }
      : undefined,
  ...(process.env.NODE_ENV === 'production' ? nrPino() : {}),
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default {
  info: logger.info.bind(logger),
  err: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  debug: logger.debug.bind(logger),
};
