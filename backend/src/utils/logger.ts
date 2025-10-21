import winston from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] : ${stack || message}`;
});

// Daily rotate file transport
const fileTransport = new winston.transports.DailyRotateFile({
  dirname: "logs",          // folder to store logs
  filename: "%DATE%.log",   // daily file
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",          // keep logs for 14 days
  level: "info",
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    errors({ stack: true }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    logFormat
  ),
  transports: [
    new winston.transports.Console({
      format: combine(colorize(), logFormat),
    }),
    fileTransport,
  ],
  exitOnError: false,
});

export default logger;
