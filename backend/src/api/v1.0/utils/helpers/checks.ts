// Checks for  UPPER SNAKE CASE
const isUpperSnakeCase = (value: string) => {
  return /^[A-Z_]+$/.test(value);
};

export { isUpperSnakeCase };
