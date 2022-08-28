import winston, { format } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, prettyPrint } = format;

const logger = winston.createLogger({
  level: 'info',
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%-error.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      dirname: './logs/console',
      level: 'error',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'application-%DATE%-access.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      dirname: './logs/console',
      level: 'info',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default logger;
