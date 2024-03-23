import mongoose from "mongoose";
import UserEnums from "../../utils/enums/user";
import { type IUser } from "./type";
const { role, gender, status } = UserEnums;

const schema = new mongoose.Schema(
  {
    studentId: String,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    rollNo: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [role.STUDENT, role.TEACHER],
      default: role.STUDENT,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
    isEmailVerified: { type: Boolean, required: true },
    avatar: String,
    dateOfBirth: String,
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: [gender.MALE, gender.FEMALE],
      required: true,
    },
    status: {
      type: String,
      enum: [status.ACTIVE, status.INACTIVE],
      default: status.ACTIVE,
    },
    bloodGroup: String,
    nationality: String,
    contactNumber: String,
    joiningDate: Date,
    language: String,
    address: {
      houseNumber: { type: String },
      building: { type: String },
      landmark: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      zipCode: { type: String },
    },
    grade: String,
    guardian: {
      name: { type: String },
      emailId: { type: String },
      contactNo: { type: String },
      alternateContactNo: { type: String },
      relation: { type: String },
    },
  },
  { timestamps: true }
);

const MODEL_NAME = "user";

export const userModel = mongoose.model<IUser>(MODEL_NAME, schema);
