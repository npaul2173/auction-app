const CREATED_AT = "createdAt";
const GRADE = "grade";
const STATUS = "status";
const JOINING_DATE = "joiningDate";
const FIRST_NAME = "firstName";
const STUDENT_ID = "studentId";
const EMAIL = "email";
const GENDER = "gender";
const CONTACT_NUMBER = "contactNumber";

const stringConcat = (strings: any, ...keys: any) => {
  return function (...values: any) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key: any, i: any) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
};

export default {
  sortColumnEnums: [
    EMAIL,
    GRADE,
    STATUS,
    CREATED_AT,
    JOINING_DATE,
    FIRST_NAME,
    STUDENT_ID,
    GENDER,
    CONTACT_NUMBER,
  ],
  responseMessage: {
    USER_EMAIL_USERNAME_ALREADY_EXIST:
      "User already exists with that username/email",
    USER_ADDED: "User added successfully.",
    USER_NOT_REGISTERED: "Error: Could not register user",
    USER_NOT_FOUND: "Error: Find user Service failed",
    USER_NOT_FOUND_BY_ID: "Error: Find user Service by ID failed",
    USER_NOT_CREATED: "Error: Create user service failed",
    STUDENT_LIST: "Student list",
    STUDENT_DATA: "Student data fetched successfully",
    UPDATED_STUDENT_DATA: "Student data updated successfully",
  },
  userValidationMessage: {
    EMAIL_INVALID: "Email is invalid!",
    EMAIL_REQUIRED: "Email is required!",
    FIRSTNAME_INVALID: "Firstname is invalid!",
    FIRSTNAME_REQUIRED: "Firstname is required!",
    MIDDLEWARE_INVALID: "Middle name is invalid!",
    MIDDLEWARE_REQUIRED: "Middle name is required!",
    LASTNAME_INVALID: "Lastname is invalid!",
    LASTNAME_REQUIRED: "Lastname is required!",
    FATHERNAME_INVALID: "Father name is invalid",
    FATHERNAME_REQUIRED: "Father name is required",
    MOTHERNAME_INVALID: "Mother name is invalid",
    MOTHERNAME_REQUIRED: "Mother name is required",
    IMAGE_INVALID: "Image is invalid!",
    IMAGE_REQUIRED: "Image is required",
    MOBILE_WITH_DIGIT_LIMIT: stringConcat`Mobile should be ${"min"} to ${"max"} digits long!`,
    MOBILE_REQUIRED: "Mobile is required!",
    MOBILE_SHOULD_BE_INTEGER: "Mobile should be integer",
    DOB_INVALID: "Date of birth is invalid!",
    DOB_REQUIRED: "Date of birth is required!",
    GENDER_INVALID: "Gender is invalid!",
    GENDER_REQUIRED: "Gender is required!",
    BLOODGROUP_INVALID: "Bloodgroup is invalid!",
    BLOODGROUP_REQUIRED: "Bloodgroup is required!",
    NATIONALITY_INVALID: "Nationality is invalid!",
    NATIONALITY_REQUIRED: "Nationality is required!",
    JOININGDATE_INVALID: "Joining date is invalid!",
    JOININGDATE_REQUIRED: "Joining date is required!",
    LANGUAGE_INVALID: "Language is invalid!",
    LANGUAGE_REQUIRED: "Language is required!",
    GRADE_INVALID: "Grade is invalid!",
    GRADE_REQUIRED: "Grade is required!",
  },
};
