import type { IReq, IRes, INext } from "@util/interfaces/express.interface";
import Logging from "@util/library/logging";
import express, { type Application, type NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import { envVar } from "@envVar/env";
import CommonEnums from "@declarations/enum/common.enum";
import BaseRouter from "@baseRouter/index";
import cors from "cors";
const { responseMessage } = CommonEnums;

class App {
  public express: Application;
  public port: number;

  constructor(port: number) {
    this.port = port;
    this.express = express();
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.initializeDatabaseConnection()
      .then(() => {
        this.express.use(cors({ origin: "*" }));
        this.initializeControllers();
        this.globalErrorHandler();
      })
      .catch((error) => {
        console.error(responseMessage.DATABASE_ERROR, error);
      });
  }

  /*
   * Mongodb connection
   */
  private async initializeDatabaseConnection() {
    try {
      mongoose
        .connect(envVar.DB_PATH)
        .then(() => {
          Logging.log(responseMessage.MONGODB_CONNECTED);
        })
        .catch((err) => {
          Logging.error(err);
        });
    } catch (error) {
      throw new Error(responseMessage.ERROR);
    }
  }

  /*
   * handling error
   */
  private handleError(): void {
    this.express.use((req: IReq, res: IRes, next: NextFunction) => {
      // Handle the error here.
      const errorMessage = responseMessage.SOMETHING_WENT_WRONG;
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ error: { success: false, message: errorMessage } });
    });
  }

  /*
   * Initialising controller
   */
  private initializeControllers(): void {
    this.express.get("/", (_, res) => {
      res.status(StatusCodes.OK).json({
        message: responseMessage.PORT_IS_RUNNING,
      });
    });
    this.express.use("/api", BaseRouter);
  }

  /*
   * Global error handler
   */
  private globalErrorHandler() {
    this.express.use(function (err: any, req: IReq, res: IRes, next: INext) {
      if (!err) {
        next();
        return;
      }

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: {
          success: false,
          message: responseMessage.INTERNAL_SERVER_ERROR,
          error: err.errors,
        },
      });
    });
  }

  /*
   * Port
   */
  public listen(): void {
    this.express.listen(this.port, () => {
      Logging.info(`App listening on the port ${this.port} 🤞`);
    });
  }
}

export default App;
