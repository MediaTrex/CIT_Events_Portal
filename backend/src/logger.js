import winston from 'winston';

const { combine, timestamp, json, printf } = winston.format;

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      format: printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [new winston.transports.File({ filename: 'logs/app.log', maxsize: 5_242_880, maxFiles: 3 })]
      : []),
  ],
});

export default logger;
