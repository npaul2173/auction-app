import SchoolAdminService from "../../services/schoolAdmin/schoolAdmin.service";
import StudentService from "@services/schoolAdmin/student.service";
import { getOKResponse } from "../../utils/helpers/response";
import {
  type IReq,
  type IRes,
  type INext,
} from "../../utils/interfaces/express.interface";
import Logging from "../../utils/library/logging";
import {
  pagination,
  sortDataBasedOnColumn,
} from "../../utils/util/common.util";
import UserEnums from "@declarations/enum/user.enum";
import LoggerService from "@handlers/logger";
const { responseMessage } = UserEnums;
const logger = new LoggerService("app");

class StudentController {
  private readonly schoolAdminService: SchoolAdminService;
  private readonly studentService: StudentService;
  constructor() {
    this.schoolAdminService = new SchoolAdminService();
    this.studentService = new StudentService();
  }

  /**
   * @summary Function that takes page number , searchValue, subject, grade, status, date and returns student list accordingly
   * @body searchValue, subject, grade, status, joiningDateRange
   * @query {Number} pageNo , limit
   * @returns Student list
   * @author Jaya
   * @date 13 JFeb 2024
   */
  studentList = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { searchValue, filter, sortBy } = req.body;
      const { pageNo, limit } = req.query;
      const pageNum = Number(pageNo);

      const data = {
        pageNo: pageNum,
        searchValue,
        grade: filter?.grade,
        status: filter?.status,
        joiningDateRange: filter?.joiningDateRange,
        sortValue: sortDataBasedOnColumn(sortBy.column, sortBy.direction),
        perPageData: pageNum
          ? pagination(pageNum, Number(limit))
          : pagination(1),
      };

      const results = await this.schoolAdminService.getStudentsList(data, next);
      const message = responseMessage.STUDENT_LIST;
      return getOKResponse(res, results, message);
    } catch (error) {
      Logging.error(`Error: ${error}`);
      next(error);
    }
  };

  /**
   * @summary Function that fetch student details
   * @query {Number}"studentId"
   * @returns Get student detail
   * @author Jaya
   * @date 16 Jan 2024
   */
  getStudent = async (req: IReq, res: IRes, next: INext) => {
    try {
      const studentId = req.params.id;
      const student = await this.studentService.getStudent(studentId, next);
      const message = responseMessage.STUDENT_DATA;
      logger.info(
        "🚀 ~ file: auth.controller.ts ~ line 60 ~ AuthController ~ getStudent ~ getStudent",
        student
      );
      return getOKResponse(res, student, message);
    } catch (error) {
      logger.error(
        "🚀 ~ file: auth.controller.ts ~ line 67 ~ AuthController ~ getStudent ~ error",
        error
      );
      next(error);
    }
  };

  /**
   * @summary Function that takes studentId and update the data of student
   * @body 
   * studentId,
      email
      rollNo
      firstName
      middleName
      lastName
      avatar
      dateOfBirth
      fatherName
      gender
      bloodGroup
      nationality
      contactNumber
      joiningDate
      language
      grade
      address
      guardian
   * @returns Updated student data
   * @author Jaya
   * @date 19 Feb 2024
   */
  editStudent = async (req: IReq, res: IRes, next: INext) => {
    try {
      const { id, ...rest } = req.body;

      const data = {
        id,
        ...rest,
      };

      const results = await this.schoolAdminService.updateStudent(data, next);
      const message = responseMessage.UPDATED_STUDENT_DATA;
      return getOKResponse(res, results, message);
    } catch (error) {
      Logging.error(`Error: ${error}`);
      next(error);
    }
  };
}

export default StudentController;
