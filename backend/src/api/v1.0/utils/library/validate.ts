import { type NextFunction, type Request, type Response } from "express";
import {
  type ValidationChain,
  body,
  validationResult,
  param,
} from "express-validator";
import { StatusCodes } from "http-status-codes";

const validateRequest = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (result.array.length) break;
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      next();
      return;
    }
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors,
    });
  };
};

const validateBody = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
    return;
  }

  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    errors,
  });
};

const requiredValidation = (column: string, name: string) => {
  return body(column).exists().withMessage(`${name} is required`);
};

const requiredObjectValidation = (column: string, name: string) => {
  return requiredValidation(column, name).custom((value) => {
    return Object.keys(value).length !== 0;
  });
};

const requiredValidationParam = (column: string, name: string) => {
  return param(column).exists().withMessage(`${name} is required`);
};

export {
  requiredValidation,
  validateBody,
  requiredObjectValidation,
  validateRequest,
  requiredValidationParam,
};
