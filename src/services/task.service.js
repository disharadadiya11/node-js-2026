const { TASK } = require("../constants/message");
const taskModel = require("../models/task.model");
const { StatusCodes } = require("http-status-codes");
const { paginate } = require("../utils/pagination.utils");
const { successResponse, errorResponse } = require("../utils/response.utils");

module.exports = class TaskService {
  constructor() {
    this.taskModel = taskModel;
  }

  async add(body) {
    let result = await this.taskModel.findOne({ name: body.name });
    if (result) {
      return errorResponse(StatusCodes.BAD_REQUEST, false, TASK.ALREADY_EXISTS);
    }

    result = await this.taskModel.create(body);
    result.meta.createdBy = result._id;
    await result.save();

    return successResponse(
      StatusCodes.CREATED,
      false,
      TASK.CREATE_SUCCESS,
      result,
    );
  }

  async update(id, body, user) {
    let result = await this.taskModel.findById(id);
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, TASK.NOT_FOUND);
    }

    result = await this.taskModel.findByIdAndUpdate(id, body);
    return successResponse(StatusCodes.OK, false, TASK.LOGIN_SUCCESS, result);
  }

  async delete(id, user) {
    let result = await this.taskModel.findByIdAndUpdate(id, {
      "meta.deletedAt": new Date(),
      "meta.deletedBy": user._id,
    });
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, TASK.NOT_FOUND);
    }

    return successResponse(StatusCodes.OK, false, TASK.DELETE_SUCCESS);
  }

  async get(id) {
    let result = await this.taskModel.findById(id).populate({
      path: "userIds",
      select: "_id name email",
    });
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, TASK.PLEASE_REGISTER);
    }
    return successResponse(StatusCodes.OK, false, TASK.FOUND_SUCCESS, result);
  }

  async getAll(query) {
    const matchQuery = {
      "meta.deletedAt": null,
    };

    const { skip, limit, pagination } = await paginate({
      page: query.page,
      limit: query.limit,
      totalItems: await this.taskModel.countDocuments(matchQuery),
    });

    const pipeline = [
      {
        $match: matchQuery,
      },
      {
        $lookup: {
          from: "users",
          localField: "userIds",
          foreignField: "_id",
          as: "userIds",
        },
      },
      ...(query.search
        ? [
            {
              $match: {
                $or: [
                  { name: { $regex: query.search, $options: "i" } },
                  { email: { $regex: query.search, $options: "i" } },
                ],
              },
            },
          ]
        : []),
      {
        $sort: { "meta.createdAt": -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          name: 1,
          meta: 1,
          userIds: {
            _id: 1,
            name: 1,
          },
        },
      },
    ];

    let result = await this.taskModel.aggregate(pipeline);

    return successResponse(
      StatusCodes.OK,
      false,
      TASK.FOUND_SUCCESS,
      result,
      pagination,
    );
  }
};
