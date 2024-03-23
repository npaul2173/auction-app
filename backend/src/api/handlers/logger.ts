import path from "path";
import winston from "winston";
import moment from "moment";

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

class LoggerService {
  logData: null | undefined;
  route: any;
  folder: any;
  dir: string | undefined;
  folder1: string | undefined;
  dir1: string | undefined;
  now: any;
  log: winston.Logger | undefined;
  dirname: string = "src";
  constructor(route: any) {
    this.logger(route);
    this.dirname = "src";
  }

  logger = (route: any) => {
    this.logData = null;
    this.route = route;
    this.folder = moment().utc(true).format("YYYYMMDD");
    this.dir = this.dirname + "/logs/" + this.folder;
    this.folder1 =
      moment().utc(true).format("YYYYMMDD") +
      "/" +
      moment().utc(true).format("HH");
    this.dir1 = this.dirname + "/logs/" + this.folder1;
    this.now = moment().utc(true).format("Do MMMM , h:mm:ss a");
    const logger = winston.createLogger({
      transports: [
        // For Printing Logs in Console of all errors
        new winston.transports.Console(),

        /// It will catch all errors
        new winston.transports.File({
          filename: path.join(this.dir1 + "/errors.log"),
          // timestamp: this.now,
          // prepend: true,
          handleExceptions: true,
          // colorize: true,
          maxsize: 1024 * 1024 * 500,
          maxFiles: 10,
          // json: true,
          tailable: true,
          level: "error",
          format: winston.format.printf((error) => {
            let message = `${dateFormat()} | ${error.level.toUpperCase()} | error.log | ${
              error.message
            } | `;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            message = error.obj
              ? message + `data:${JSON.stringify(error.obj)} | `
              : message;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            message = this.logData
              ? message + `log_data:${JSON.stringify(this.logData)} | `
              : message;
            return message;
          }),
        }),
        // It will catch all requests coming from requesters  of all warnings
        new winston.transports.File({
          handleExceptions: true,
          level: "info",
          // colorize: true,
          maxsize: 1024 * 1024 * 500,
          maxFiles: 10,
          filename: this.dir1 + `/${this.route}.log`, // `./logs/${route}.txt` //path: __dirname + "/.env"
          format: winston.format.printf((info) => {
            const message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route}.log | ${
              info.message
            } | `;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (info.obj)
              return `${message}data:${JSON.stringify(info.obj)} | `;
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            else if (this.logData)
              return message + `log_data:${JSON.stringify(this.logData)} | `;
            else return message;
          }),
        }),

        /// It will only created for debug purposes
        new winston.transports.File({
          handleExceptions: true,
          level: "debug",
          // colorize: true,
          maxsize: 1024 * 1024 * 500,
          maxFiles: 10,
          // json: false,
          filename: this.dir1 + `/debug.log`, // `./logs/${route}.txt` //path: __dirname + "/.env"
          format: winston.format.simple(),
        }),
      ],
      exitOnError: false,
    });

    return logger;
  };

  setLogData(logData: null | undefined) {
    this.logData = logData;
  }

  info(message: string, obj: any = {}) {
    this.log = this.logger(this.route);
    this.log.log("info", message, {
      obj,
    });
  }

  debug(message: string, obj: any = {}) {
    this.log = this.logger(this.route);
    this.log.log("debug", message, {
      obj,
    });
  }

  error(message: string, obj: any = {}) {
    this.log = this.logger(this.route);
    this.log.log("error", message, {
      obj,
    });
  }
}

export default LoggerService;
