const ASC = "ASC";
const DESC = "DESC";

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
  sortDirection: { ASC, DESC },
  sortDirectionEnums: [ASC, DESC],
  responseMessage: {
    USER_NOT_AUTHORIZED_MISSING_TOKEN: "Unauthorized - Missing token",
    USER_NOT_AUTHORIZED_INVALID_TOKEN: "Unauthorized - Invalid token",
    USER_NOT_AUTHORIZED_USER_NOT_FOUND: "Unauthorized - User not found",
    FORBIDDEN_INVALID_TOKEN: "Forbidden - Invalid token",
    MONGODB_CONNECTED: "MongoDB connected-",
    DATABASE_ERROR: "Error initializing database:",
    SOMETHING_WENT_WRONG: "Something went wrong!  - Error Thrown",
    PORT_IS_RUNNING: "Port is Healthy 💪 and running 🏃🏃",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    APP_LISTNING: "App listening on the port",
    ERROR: "Error",
    APP_LISTING_AT_PORT: "App listening on the port",
  },
  validationMessage: {
    INVALID_COUNTRY_CODE: "Invalid country code",
    FIELD_REQUIRED: stringConcat`${"field"} field is required!`,
    STRING_FIELD: stringConcat`${"field"} field should be string!`,
    FIELD_EMPTY: stringConcat`${"field"} field should be empty.`,
    ARRAY_FIELD: stringConcat`${"field"} field must contain at least one ${"object"}!`,
    PROVIDE_CONTACTS: "Please provide contacts",
    INVALID_FIELD: stringConcat`${"field"} is invalid!`,
    INTEGER_FIELD: stringConcat`${"field"} field should be integer only!`,
    RATIO_FIELD: stringConcat`${"field"} field should be ratio!`,
    FIELD_WITH_CHAR_LIMIT: stringConcat`${"field"} field should be ${"min"} to ${"max"} characters long!`,
    FIELD_WITH_DIGIT_LIMIT: stringConcat`${"field"} field should be ${"min"} to ${"max"} digits long!`,
    FIELD_WITH_MAX_LIMIT: stringConcat`${"field"} field should have maximum ${"max"} items!`,
    FIELD_MUST_CONTAIN: stringConcat`${"field"} field should contain any of these ${"enums"}!`,
    FIELD_GREATER_THEN: stringConcat`${"field"} field must be greater than ${"min"}`,
    BOOLEAN_FIELD: stringConcat`${"field"} field should be boolean only!`,
    ARRAY_FIELD_VALUE: stringConcat`${"field"} field should be array only!`,
    DATE_FORMAT: stringConcat`${"field"} field must be in ${"format"} format`,
    FIELD_SHOULD_BE_EQUAL: "domains & total companies must be equal.",
    START_DATE: "startDate should be current or future date",
    FIELD_VALUE_SHOULD_NOT_BE_EQUAL: stringConcat`${"field1"} & ${"field2"} should not be similar`,
    ARRAY_FIELD_LIMIT: stringConcat`${"field"} should be min ${"min"} to max ${"max"} long!`,
    ARRAY_FIELD_SAME_LIMIT: stringConcat`${"field"} should be min and max ${"max"} objects long!`,
    POSITIVE_FIELD: stringConcat`${"field"} field must be an positive number!`,
  },
  contactPhoneLength: {
    MIN: 6,
    MAX: 15,
  },
};
