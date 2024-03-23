// This are read mate helper functions to create response objects

import { StatusCodes } from "http-status-codes";
import { type JsonResponse } from "../interfaces/response.interface";
import { type IRes } from "../interfaces/express.interface";
import Logging from "../library/logging";

const getOKResponse = (res: IRes, data?: any, message?: string) => {
  const response: JsonResponse = {
    status: true,
    statusCode: StatusCodes.OK,
    data,
    message,
  };
  return res.status(StatusCodes.OK).send(response);
};

const getNoContentResponse = (res: IRes, message: string) => {
  const response: JsonResponse = {
    status: true,
    statusCode: StatusCodes.NO_CONTENT,
    message,
  };
  return res.status(StatusCodes.NO_CONTENT).send(response);
};

const getCreateResponse = (res: IRes, message?: string, data?: any) => {
  const response: JsonResponse = {
    status: true,
    statusCode: StatusCodes.CREATED,
    data,
    message,
  };
  return res.status(StatusCodes.CREATED).send(response);
};

const getConflictResponse = (res: IRes, message?: string, data?: any) => {
  const response: JsonResponse = {
    status: false,
    statusCode: StatusCodes.CONFLICT,
    data,
    message,
  };
  return res.status(StatusCodes.CONFLICT).send(response);
};

const getUnauthorizedResponse = (res: IRes, message?: string, data?: any) => {
  const response: JsonResponse = {
    status: false,
    statusCode: StatusCodes.UNAUTHORIZED,
    data,
    message,
  };
  return res.status(StatusCodes.UNAUTHORIZED).send(response);
};

const getInternalServerErrorResponse = (
  res: IRes,
  error: unknown,
  message: string = "Internal Server Error"
) => {
  const response: JsonResponse = {
    status: false,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message,
  };
  Logging.error(`❌ Error:${message}`, error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(response);
};

const getNotFoundResponse = (res: IRes, message?: string, data?: any) => {
  const response: JsonResponse = {
    status: false,
    statusCode: StatusCodes.NOT_FOUND,
    data,
    message,
  };
  return res.status(StatusCodes.NOT_FOUND).send(response);
};

const getBadRequestResponse = (res: IRes, message?: string, data?: any) => {
  const response: JsonResponse = {
    status: false,
    statusCode: StatusCodes.BAD_REQUEST,
    data,
    message,
  };
  return res.status(StatusCodes.BAD_REQUEST).send(response);
};

export {
  getCreateResponse,
  getOKResponse,
  getConflictResponse,
  getUnauthorizedResponse,
  getInternalServerErrorResponse,
  getNotFoundResponse,
  getNoContentResponse,
  getBadRequestResponse,
};
