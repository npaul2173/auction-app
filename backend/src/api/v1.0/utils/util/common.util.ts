import commonEnum from "@declarations/enum/common.enum";

/**
 * @summary Interface for Pagination's Query field in Utils
 * @author Jaya
 * @date 09 Jan 2024
 */
export interface IPaginationQuery {
  skip?: number;
  limit?: number;
}

/**
 * @summary Function that takes page number and returns page details
 * @param {Number} pageNo
 * @returns calculated limit & skip data
 * @author Jaya
 * @date 09 Jan 2024
 */
export const pagination = (pageNo: number, dataLimit?: number) => {
  const query: IPaginationQuery = {};
  let response: object = {};
  const size: number = dataLimit ?? 10;

  if (pageNo < 0 || pageNo === 0) {
    response = {
      error: true,
      message: "Invalid page number, should start with 1",
    };
    return JSON.stringify(response);
  }
  query.skip = size * (pageNo - 1);
  query.limit = size;
  return query;
};

/**
 * @summary Function that takes column, sortDirection and returns sort details
 * @param {*} column
 * @param {*} sortDirection
 * @returns sort details
 * @author Jaya
 * @date 27 Feb 2024
 */
export const sortDataBasedOnColumn = (
  column: string = "createdAt",
  sortDirection: string = commonEnum.sortDirection.DESC
) => {
  console.log("sort", sortDirection);
  const obj: any = {};
  obj[column] =
    (sortDirection === commonEnum.sortDirection.ASC && 1) ||
    (sortDirection === commonEnum.sortDirection.DESC && -1);
  return obj;
};
