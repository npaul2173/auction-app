import type mongoose from "mongoose";
import { type IPaginationQuery } from "../../utils/util/common.util";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  studentId: string;
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar?: string | null;
  dateOfBirth: string;
  isEmailVerified?: boolean;
  fatherName: string;
  motherName: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  contactNumber: string;
  joiningDate: Date;
  language: string;
  grade: string;
  address: object;
  createdAt: Date;
  updatedAt: Date;
  userRoleId: string;
  guardian: object;
  status: string;
}

export type UserProps = Omit<IUser, "updatedAt" | "createdAt">;

export type CreateUserProps = Omit<
  IUser,
  "createdAt" | "updatedAt" | "_id" | "isEmailVerified"
>;

export interface IGetAllStudents {
  pageNo: number;
  perPageData: any | IPaginationQuery;
}

export interface IGetStudent {
  studentId: mongoose.Types.ObjectId;
}

export interface IUserEdit {
  id: mongoose.Types.ObjectId;
  email: string;
  rollNo: string;
  firstName: string;
  middleName: string;
  lastName: string;
  avatar?: string | null;
  dateOfBirth: string;
  fatherName: string;
  motherName: string;
  gender: string;
  bloodGroup: string;
  nationality: string;
  contactNumber: string;
  joiningDate: Date;
  language: string;
  grade: string;
  address: object;
  guardian: object;
}
