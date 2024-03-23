import AuthMiddleware from "@baseRouter/middlewares/auth.middleware";
import {
  type IReq,
  type IRes,
  type INext,
} from "@util/interfaces/express.interface";
import { Router as route } from "express";
import { validateBody } from "@util/library/validate";
import SchoolAdminController from "../controller/schoolAdmin/studentData.controller";
import { studentListValidation } from "../validations/student/student.validate";
import { registerValidate } from "@validators/user/register.validate";
import {
  studentValidation,
  editStudentValidation,
} from "@validators/student/student.validate";
import StudentController from "@controllers/schoolAdmin/student.controller";

class Routes {
  route: any;
  logger: any;
  private readonly studentController: StudentController;
  private readonly authMiddleware: AuthMiddleware;
  private readonly schoolAdminController: SchoolAdminController;

  constructor() {
    this.route = route();
    this.studentController = new StudentController();
    this.authMiddleware = new AuthMiddleware();
    this.schoolAdminController = new SchoolAdminController();
    this.useRoutes();
  }

  useRoutes() {
    this.post();
    this.get();
    this.put();
  }

  post() {
    this.route.post(
      "/add/student",
      registerValidate,
      validateBody,
      (req: IReq, res: IRes, next: INext) => {
        this.studentController.registerUser(req, res, next);
      }
    );

    this.route.post(
      "/students",
      studentListValidation,
      validateBody,
      (req: IReq, res: IRes, next: INext) => {
        this.schoolAdminController.studentList(req, res, next);
      }
    );
  }

  get() {
    this.route.get(
      "/student/:id",
      studentValidation,
      validateBody,
      (req: IReq, res: IRes, next: INext) => {
        this.schoolAdminController.getStudent(req, res, next);
      }
    );
  }

  put() {
    this.route.put(
      "/student",
      editStudentValidation,
      validateBody,
      (req: IReq, res: IRes, next: INext) => {
        this.schoolAdminController.editStudent(req, res, next);
      }
    );
  }
}

// export default Routes;
export default new Routes().route;
