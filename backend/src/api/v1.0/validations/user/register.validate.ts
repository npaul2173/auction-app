import { requiredValidation } from "@util/library/validate";

const validation = [
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

export { validation as registerValidate };
