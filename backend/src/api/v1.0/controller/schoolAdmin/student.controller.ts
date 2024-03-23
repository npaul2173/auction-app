import type { CreateUserProps } from "@baseRouter/models/user/type";
import StudentService from "@services/schoolAdmin/student.service";
import { getConflictResponse, getCreateResponse } from "@util/helpers/response";
import type { IReq, IRes, INext } from "@util/interfaces/express.interface";
import UserEnums from "@declarations/enum/user.enum";
import { hashText } from "@util/helpers/hashPass";
import LoggerService from "@handlers/logger";
const logger = new LoggerService("app");
const { responseMessage } = UserEnums;

class AuthController {
  readonly studentService: StudentService;
  constructor() {
    this.studentService = new StudentService();
  }

  /** const
* @summary Function that register a user
* @param {Number}     
     "email"
    "gender"
    "studentId"
    "role"
    "rollNo"
    "firstName"
    "lastName"
    "motherName"
    "fatherName"
    "bloodGroup"
    "nationality"
    "address"
    "contactNumber"
    "password"
* @returns Registered user id ,email and message
* @author Jaya
* @date 07 Jan 2024
*/
  registerUser = async (req: IReq, res: IRes, next: INext) => {
    const inputData: CreateUserProps = { ...req.body };
    try {
      const userData = await this.studentService.findByUserNameOrEmail(
        // inputData.firstName,
        inputData.email,
        next
      );
      if (userData) {
        const message = responseMessage.USER_EMAIL_USERNAME_ALREADY_EXIST;
        return getConflictResponse(res, message);
      } else {
        // Generate an 8-character alphanumeric password
        const password = Array(8)
          .fill(0)
          .map(() => Math.random().toString(36).charAt(2))
          .join("");
        const hashPass = await hashText(password);
        if (hashPass) {
          const serviceResponse = await this.studentService.createUser(
            {
              ...inputData,
              password: hashPass,
            },
            next
          );
          const message = responseMessage.USER_ADDED;
          logger.info(
            "🚀 ~ file: auth.controller.ts ~ line 60 ~ AuthController ~ registerUser ~ serviceResponse",
            serviceResponse
          );
          return getCreateResponse(res, message, serviceResponse);
        } else {
          logger.error(
            `🚀 ~ file: auth.controller.ts ~ line 63 ~ AuthController ~ registerUser ~ error`,
            responseMessage.USER_NOT_REGISTERED
          );
          return getConflictResponse(
            res,
            responseMessage.USER_NOT_REGISTERED,
            {}
          );
        }
      }
    } catch (error) {
      logger.error(
        "🚀 ~ file: auth.controller.ts ~ line 67 ~ AuthController ~ registerUser ~ error",
        error
      );
      next(error);
    }
  };
}

export default AuthController;
