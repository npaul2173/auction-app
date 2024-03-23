import CommonEnums from "@declarations/enum/common.enum";
import { envVar } from "@envVar/env";
import StudentService from "@services/schoolAdmin/student.service";
import { getConflictResponse } from "@util/helpers/response";

import {
  type INext,
  type IReq,
  type IRes,
} from "@util/interfaces/express.interface";
import jwt from "jsonwebtoken";
const { responseMessage } = CommonEnums;

class AuthMiddleware {
  private readonly studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  /**
   * @summary Function to verify jwt token
   * @param  token
   * @returns verified user
   * @author Nabendu Paul
   * @date 01 Jan 2024
   */
  authenticate = async (req: IReq, res: IRes, next: INext) => {
    const authHeader =
      !!req.headers.authorization ||
      (req.headers.Authorization as string | undefined);

    if (!authHeader)
      return getConflictResponse(
        res,
        responseMessage.USER_NOT_AUTHORIZED_MISSING_TOKEN
      );
    else if (
      typeof authHeader === "string" &&
      !authHeader.startsWith("Bearer ")
    )
      return getConflictResponse(
        res,
        responseMessage.USER_NOT_AUTHORIZED_INVALID_TOKEN
      );

    let token;
    if (typeof authHeader === "string") {
      token = authHeader.split(" ")[1];
      try {
        const decodedValue = jwt.verify(token, envVar.JSON_SECRET_KEY) as {
          roleId: string;
          userId: string;
        };

        const userFound = await this.studentService.findUserById(
          decodedValue.userId,
          next
        );

        if (!userFound)
          return getConflictResponse(
            res,
            responseMessage.USER_NOT_AUTHORIZED_USER_NOT_FOUND
          );
        //   req.userData = userFound;
        next();
      } catch (error) {
        return getConflictResponse(
          res,
          responseMessage.FORBIDDEN_INVALID_TOKEN
        );
      }
    }
  };
}

export default AuthMiddleware;
