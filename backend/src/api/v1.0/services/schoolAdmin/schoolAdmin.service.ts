import { userModel } from "../../models/user/index";
import { type IUserEdit } from "../../models/user/type";
import { type INext } from "../../utils/interfaces/express.interface";
import Logging from "../../utils/library/logging";

class SchoolAdminService {
  /**
   * @summary Function to get Student Details by Aggreagtion
   * @param {Object} query
   * @param {*} next
   * @returns Student details
   * @author Jaya
   * @date 13 Feb 2024
   */
  async findByAggregation(query: any, next: INext) {
    try {
      const results = await userModel.aggregate(query, {
        collation: { locale: "en" },
        allowDiskUse: true,
      });

      return results;
    } catch (error) {
      next(error);
    }
  }

  /**
   * @summary Function to get total Student
   * @param {Object} query
   * @param {*} next
   * @returns Student details
   * @author Jaya
   * @date 14 Feb 2024
   */
  async findCount(query: any, next: INext) {
    try {
      const totalNoOfStudents = await userModel.countDocuments({
        role: query.role,
      });
      let totalNumberPages;
      if (totalNoOfStudents) {
        totalNumberPages = Math.ceil(totalNoOfStudents / query.limit);
      }
      return {
        totalNoOfStudents,
        totalNumberPages,
      };
    } catch (error) {
      next(error);
    }
  }

  /**
   * @summary Function to get all Students data
   * @param {
   *   searchValue,
   *   subject,
   *   grade,
   *   status,
   *   date,
   *   perPageData,
   *   pageNo
   * } obj
   * @param {*} next
   * @returns all student records
   * @author Jaya
   * @date 13 Feb 2024
   */
  async getStudentsList(obj: any, next: INext) {
    try {
      const {
        searchValue,
        grade,
        status,
        joiningDateRange,
        pageNo,
        perPageData,
        sortValue,
      } = obj;

      let gradeQuery = {};
      if (grade) {
        gradeQuery = { grade }; // Match the provided grade
      }

      let statusQuery = {};
      if (status) {
        statusQuery = { status }; // Match the provided status
      }

      let joiningDateRangeQuery = {};
      if (joiningDateRange?.start && joiningDateRange.end) {
        joiningDateRangeQuery = {
          joiningDate: {
            $gte: new Date(joiningDateRange.start), // Match joining dates greater than or equal to start date
            $lte: new Date(joiningDateRange.end), // Match joining dates less than or equal to end date
          },
        };
      }

      const query = [
        {
          $match: {
            role: "STUDENT",
            $or: [
              { studentId: { $regex: searchValue, $options: "i" } },
              { email: { $regex: searchValue, $options: "i" } },
              { firstName: { $regex: searchValue, $options: "i" } },
              { middleName: { $regex: searchValue, $options: "i" } },
              { lastName: { $regex: searchValue, $options: "i" } },
              { gender: { $regex: searchValue, $options: "i" } },
              { grade: { $regex: searchValue, $options: "i" } },
              { status: { $regex: searchValue, $options: "i" } },
              { contactNumber: { $regex: searchValue, $options: "i" } },
            ],
            ...gradeQuery,
            ...statusQuery,
            ...joiningDateRangeQuery,
          },
        },
        {
          $sort: sortValue,
        },
        {
          $project: {
            password: 0, // Exclude the password field from the result
            __v: 0, // Exclude the __v field from the result
          },
        },
        {
          $facet: {
            nodes: [{ $skip: perPageData.skip }, { $limit: perPageData.limit }],
            totalCount: [{ $count: "count" }],
          },
        },
        {
          $addFields: {
            total: {
              $ifNull: [{ $arrayElemAt: ["$totalCount.count", 0] }, 0],
            },
          },
        },
        {
          $addFields: {
            lastPageNo: {
              $ceil: { $divide: ["$total", perPageData.limit] },
            },
          },
        },
        {
          $project: {
            nodes: "$nodes",
            pageInfo: {
              previousPage: {
                $cond: {
                  if: { $lte: [pageNo, 1] },
                  then: null,
                  else: pageNo - 1,
                },
              },
              currentPage: { $toInt: `${Number(pageNo)}` },
              nextPage: {
                $cond: {
                  if: { $gte: [pageNo, "$lastPageNo"] },
                  then: null,
                  else: pageNo + 1,
                },
              },
              lastPageNo: 1,
              hasNextPage: {
                $cond: {
                  if: { $gte: [pageNo, "$lastPageNo"] },
                  then: false,
                  else: true,
                },
              },
            },
            total: 1,
            totalPerPage: {
              $cond: {
                if: { $isArray: "$nodes" },
                then: { $size: "$nodes" },
                else: 0,
              },
            },
          },
        },
      ];

      const results: any = await this.findByAggregation(query, next);

      return results[0];
    } catch (error) {
      Logging.error(`Error: ${error}`);
      next(error);
    }
  }

  /**
   * @summary Function to update student data
   * @param {Object} body
   * @param {*} next
   * @returns Student updated details
   * @author Jaya
   * @date 19 Feb 2024
   */
  async updateStudent(data: IUserEdit, next: INext) {
    try {
      const { id, ...rest } = data;

      // Update the document excluding the ID
      const updatedStudent = await userModel.findByIdAndUpdate(id, rest, {
        new: true,
      });

      return {
        updatedStudent,
      };
    } catch (error) {
      next(error);
    }
  }
}

export default SchoolAdminService;
