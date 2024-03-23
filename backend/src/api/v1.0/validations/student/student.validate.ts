import commonEnum from "@declarations/enum/common.enum";
import userEnum from "@declarations/enum/user.enum";
import { userModel } from "@models/user";
import { requiredValidation } from "@util/library/validate";
import { body, param, query } from "express-validator";
// **** Variables **** //
const { validationMessage, contactPhoneLength } = commonEnum;
const { userValidationMessage, sortColumnEnums } = userEnum;

export const registerValidate = [
  requiredValidation("email", "Email").isEmail(),
  requiredValidation("gender", "Gender"),
  requiredValidation("firstName", "FirstName"),
  requiredValidation("lastName", "LastName"),
  requiredValidation("fatherName", "FatherName"),
  requiredValidation("motherName", "MotherName"),
  requiredValidation("bloodGroup", "BloodGroup"),
  requiredValidation("nationality", "Nationality"),
  requiredValidation("address.houseNumber", "Housenumber"),
  requiredValidation("address.building", "Building"),
  requiredValidation("address.landmark", "Landmark"),
  requiredValidation("address.country", "Country"),
  requiredValidation("address.state", "State"),
  requiredValidation("address.zipCode", "zipCode"),
  requiredValidation("joiningDate", "Joining date"),
  requiredValidation("guardian.name", "Guardian name"),
  requiredValidation("guardian.emailId", "Guardian emailId"),
  requiredValidation("guardian.contactNo", "Guardian contactnumber"),
  requiredValidation("guardian.relation", "Guardian relation"),
  requiredValidation("contactNumber", "ContactNumber")
    .isLength({ min: 8 })
    .withMessage("Contact number has to be minimum of 8 letters")
    .isLength({ max: 12 })
    .withMessage("Contact number has to be minimum of 8 letters"),
];

export const userListValidation = [
  requiredValidation("pageNo", "pageNo"),
  requiredValidation("limit", "Limit"),
];

export const studentListValidation = [
  query("pageNo")
    .isInt()
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "pageNo" })),
  query("limit")
    .isInt()
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "limit" })),
  body("searchValue")
    .optional({ checkFalsy: true })
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "searchValue" }))
    .exists()
    .trim()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "searchValue" })),
  body("sortBy.column")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "sortBy.column" }))
    .exists()
    .trim()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "sortBy.column" }))
    .isIn(sortColumnEnums)
    .withMessage(
      validationMessage.FIELD_MUST_CONTAIN({
        field: "sortBy.column",
        enums: sortColumnEnums.toString().replace(/,/g, ", "),
      })
    ),
  body("sortBy.direction")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "sortBy.direction" }))
    .exists()
    .trim()
    .notEmpty()
    .withMessage(
      validationMessage.FIELD_REQUIRED({ field: "sortBy.direction" })
    )
    .isIn(commonEnum.sortDirectionEnums)
    .withMessage(
      validationMessage.FIELD_MUST_CONTAIN({
        field: "sortBy.direction",
        enums: commonEnum.sortDirectionEnums.toString().replace(/,/g, ", "),
      })
    ),
];

export const studentValidation = [
  param("id")
    .isString()
    .isMongoId()
    .withMessage(validationMessage.INVALID_FIELD({ field: "id" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "id" })),
];

export const editStudentValidation = [
  body("id")
    .isString()
    .isMongoId()
    .withMessage(validationMessage.INVALID_FIELD({ field: "id" }))
    .custom(async (value: any) => {
      const user = await userModel.findById(value);
      if (!user) {
        throw new Error(validationMessage.INVALID_FIELD({ field: "id" }));
      }
      return true;
    })
    .exists()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "id" })),
  body("avatar")
    .isString()
    .withMessage(userValidationMessage.IMAGE_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.IMAGE_REQUIRED),
  body("firstName")
    .isString()
    .withMessage(userValidationMessage.FIRSTNAME_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.FIRSTNAME_REQUIRED),
  body("middleName")
    .isString()
    .withMessage(userValidationMessage.MIDDLEWARE_INVALID)
    .optional()
    .withMessage(userValidationMessage.MIDDLEWARE_REQUIRED),
  body("lastName")
    .isString()
    .withMessage(userValidationMessage.LASTNAME_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.LASTNAME_REQUIRED),
  body("email")
    .trim()
    .isEmail()
    .withMessage(userValidationMessage.EMAIL_INVALID)
    .exists()
    .notEmpty()
    .withMessage(userValidationMessage.EMAIL_REQUIRED),
  body("fatherName")
    .isString()
    .withMessage(userValidationMessage.FATHERNAME_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.FATHERNAME_REQUIRED),
  body("motherName")
    .isString()
    .withMessage(userValidationMessage.MOTHERNAME_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.MOTHERNAME_REQUIRED),
  body("contactNumber")
    .optional({ checkFalsy: true })
    .isInt()
    .isNumeric()
    .withMessage(userValidationMessage.MOBILE_SHOULD_BE_INTEGER)
    .trim()
    .escape()
    .exists()
    .notEmpty()
    .withMessage(userValidationMessage.MOBILE_REQUIRED)
    .isLength({ min: contactPhoneLength.MIN, max: contactPhoneLength.MAX })
    .withMessage(
      userValidationMessage.MOBILE_WITH_DIGIT_LIMIT({
        min: contactPhoneLength.MIN,
        max: contactPhoneLength.MAX,
      })
    ),
  body("address.houseNumber")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "houseNumber" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "houseNumber" })),
  body("address.building")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "building" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "building" })),
  body("address.landmark")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "landmark" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "landmark" })),
  body("address.country")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "country" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "country" })),
  body("address.state")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "state" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "state" })),
  body("address.city")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "city" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "city" })),
  body("address.zipCode")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "zipCode" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "zipCode" })),
  body("dateOfBirth")
    .isString()
    .withMessage(userValidationMessage.DOB_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.DOB_REQUIRED),
  body("gender")
    .isString()
    .withMessage(userValidationMessage.GENDER_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.GENDER_REQUIRED),
  body("bloodGroup")
    .isString()
    .withMessage(userValidationMessage.BLOODGROUP_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.BLOODGROUP_REQUIRED),
  body("nationality")
    .isString()
    .withMessage(userValidationMessage.NATIONALITY_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.NATIONALITY_REQUIRED),
  body("joiningDate")
    .isString()
    .withMessage(userValidationMessage.JOININGDATE_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.JOININGDATE_REQUIRED),
  body("language")
    .isString()
    .withMessage(userValidationMessage.LANGUAGE_INVALID)
    .optional()
    .withMessage(userValidationMessage.LANGUAGE_REQUIRED),
  body("grade")
    .isString()
    .withMessage(userValidationMessage.GRADE_INVALID)
    .exists()
    .trim()
    .notEmpty()
    .withMessage(userValidationMessage.GRADE_REQUIRED),
  body("guardian.name")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "guardian.name" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(validationMessage.FIELD_REQUIRED({ field: "guardian.name" })),
  body("guardian.emailId")
    .isString()
    .withMessage(validationMessage.INVALID_FIELD({ field: "guardian.emailId" }))
    .trim()
    .exists()
    .notEmpty()
    .withMessage(
      validationMessage.FIELD_REQUIRED({ field: "guardian.emailId" })
    ),
  body("guardian.contactNo")
    .isString()
    .withMessage(
      validationMessage.INVALID_FIELD({ field: "guardian.contactNo" })
    )
    .trim()
    .exists()
    .notEmpty()
    .withMessage(
      validationMessage.FIELD_REQUIRED({ field: "guardian.contactNo" })
    ),
  body("guardian.alternateContactNo")
    .isString()
    .withMessage(
      validationMessage.INVALID_FIELD({ field: "guardian.alternateContactNo" })
    )
    .trim()
    .optional()
    .withMessage(
      validationMessage.FIELD_REQUIRED({ field: "guardian.alternateContactNo" })
    ),
  body("guardian.relation")
    .isString()
    .withMessage(
      validationMessage.INVALID_FIELD({ field: "guardian.relation" })
    )
    .trim()
    .exists()
    .notEmpty()
    .withMessage(
      validationMessage.FIELD_REQUIRED({ field: "guardian.relation" })
    ),
];
