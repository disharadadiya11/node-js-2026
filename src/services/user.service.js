const { USER } = require("../constants/message");
const userModel = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { generateToken } = require("../utils/jwt.utils");
const { paginate } = require("../utils/pagination.utils");
const { uploadFile } = require("../utils/fileUpload.utils");
const { encryptPassword } = require("../utils/password.utils");
const { successResponse, errorResponse } = require("../utils/response.utils");

module.exports = class UserService {
  constructor() {
    this.userModel = userModel;
  }

  async register(body, files) {
    if (files) {
      body.file = await uploadFile(files.file, process.env.BASE_URL);
    }

    let result = await this.userModel.findOne({ email: body.email });
    if (result) {
      return errorResponse(StatusCodes.BAD_REQUEST, false, USER.ALREADY_EXISTS);
    }

    body.password = await encryptPassword(body.password);
    result = await this.userModel.create(body);
    result.meta.createdBy = result._id;
    await result.save();

    result = {
      ...result._doc,
      password: undefined,
      token: generateToken({ _id: result._id }),
    };
    return successResponse(
      StatusCodes.CREATED,
      false,
      USER.REGISTER_SUCCESS,
      result,
    );
  }

  async update(id, body, files, user) {
    let result = await this.userModel.findById(id);
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, USER.NOT_FOUND);
    }

    if (files) {
      body.file = await uploadFile(files.file, process.env.BASE_URL);
    }

    if (result.email !== body.email) {
      const found = await this.userModel.findOne({ email: body.email });
      if (found) {
        return errorResponse(
          StatusCodes.BAD_REQUEST,
          false,
          USER.ALREADY_EXISTS,
        );
      }
    }

    const updateData = {
      ...body,
      "meta.updatedAt": new Date(),
      "meta.updatedBy": user._id,
    };

    result = await this.userModel.findByIdAndUpdate(id, updateData);
    return successResponse(StatusCodes.OK, false, USER.LOGIN_SUCCESS, result);
  }

  async login(body) {
    let result = await this.userModel.findOne({ email: body.email });
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, USER.PLEASE_REGISTER);
    }

    result = {
      ...result._doc,
      password: undefined,
      token: generateToken({ _id: result._id }),
    };
    return successResponse(StatusCodes.OK, false, USER.LOGIN_SUCCESS, result);
  }

  async delete(id, user) {
    let result = await this.userModel.findByIdAndUpdate(id, {
      "meta.deletedAt": new Date(),
      "meta.deletedBy": user._id,
    });
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, USER.NOT_FOUND);
    }

    return successResponse(StatusCodes.OK, false, USER.DELETE_SUCCESS);
  }

  async get(id) {
    let result = await this.userModel.findById(id).select("-password");
    if (!result) {
      return errorResponse(StatusCodes.NOT_FOUND, false, USER.PLEASE_REGISTER);
    }
    return successResponse(StatusCodes.OK, false, USER.FOUND_SUCCESS, result);
  }

  async getAll(query) {
    const matchQuery = {
      "meta.deletedAt": null,
    };

    if (query.search) {
      matchQuery.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];
    }

    const { skip, limit, pagination } = await paginate({
      page: query.page,
      limit: query.limit,
      totalItems: await this.userModel.countDocuments(matchQuery),
    });

    const pipeline = [
      {
        $match: matchQuery,
      },
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
          email: 1,
          name: 1,
          mobile: 1,
          role: 1,
          meta: 1,
        },
      },
    ];

    let result = await this.userModel.aggregate(pipeline);

    return successResponse(
      StatusCodes.OK,
      false,
      USER.FOUND_SUCCESS,
      result,
      pagination,
    );
  }
};
