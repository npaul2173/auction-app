import { userModel } from "@baseRouter/models/user/index";
import { type CreateUserProps } from "@baseRouter/models/user/type";
import LoggerService from "@handlers/logger";
import { type INext } from "@util/interfaces/express.interface";
const logger = new LoggerService("app");

class StudentService {
  /**
   * @summary Function that takes firstName and returns email
   * @param  email , firstname
   * @returns Find the user with firstname and email
   * @author Nabendu Paul
   * @date 01 Jan 2024
   */
  async findByUserNameOrEmail(email: string, next: INext) {
    try {
      // return await userModel.findOne({ $or: [{ email }, { firstName }] });
      const student = await userModel.findOne({ email });
      return student;
    } catch (error) {
      logger.error(
        "🚀 ~ file: user.service.ts ~ line 19 ~ UserService ~ findByUserNameOrEmail ~ error",
        error
      );
      next(error);
    }
  }

  /**
   * @summary Function that takes id
   * @param  id
   * @returns Find the user with id
   * @author Nabendu Paul
   * @date 01 Jan 2024
   */
  async findUserById(id: string, next: INext) {
    try {
      return await userModel.findById(id).select("-password -__v");
    } catch (error) {
      logger.error(
        "🚀 ~ file: user.service.ts ~ line 36 ~ UserService ~ findUserById ~ error",
        error
      );
      next(error);
    }
  }

  /**
   * @summary Function that takes user data
   * @param  userdata
   * @returns Creates user and returns id and email
   * @author Nabendu Paul
   * @date 01 Jan 2024
   */
  async createUser(inputData: CreateUserProps, next: INext) {
    try {
      // isEmailVerified is made true by default for now. Will be made false when email verification module is complete
      const inputDataNew = { ...inputData, isEmailVerified: true };
      const data = await userModel.create(inputDataNew);
      const userData = {
        _id: data._id,
        email: data.email,
      };
      return userData;
    } catch (error) {
      console.log(error);
      logger.error(
        "🚀 ~ file: user.service.ts ~ line 59 ~ UserService ~ createUser ~ error",
        error
      );
      next(error);
    }
  }

  /**
   * @summary Function that takes studentid and return student data data
   * @param  studentId
   * @returns Student data
   * @author Jaya
   * @date 16 Feb 2024
   */
  async getStudent(studentId: any, next: INext) {
    try {
      const userData = await this.findUserById(studentId, next);
      return userData;
    } catch (error) {
      logger.error(
        "🚀 ~ file: user.service.ts ~ line 59 ~ UserService ~ createUser ~ error",
        error
      );
      next(error);
    }
  }
}

export default StudentService;
