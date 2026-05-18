const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user.service");
const { errorResponse } = require("../utils/response.utils");
const userService = new UserService();

module.exports.register = async (req, res) => {
  try {
    const result = await userService.register(req.body, req.files);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.update = async (req, res) => {
  try {
    const result = await userService.update(
      req.params.id,
      req.body,
      req.files,
      req.user,
    );
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.login = async (req, res) => {
  try {
    const result = await userService.login(req.body);
    if (result.statusCode === StatusCodes.OK && result.data) {
      req.session.userId = result.data._id;
      req.session.userRole = result.data.role;
    }
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            errorResponse(
              StatusCodes.INTERNAL_SERVER_ERROR,
              true,
              "Logout failed",
            ),
          );
      }
      return res
        .status(StatusCodes.OK)
        .json({
          statusCode: StatusCodes.OK,
          error: false,
          message: "Logged out successfully",
        });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.delete = async (req, res) => {
  try {
    const result = await userService.delete(req.params.id, req.user);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.get = async (req, res) => {
  try {
    const result = await userService.get(req.params.id);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.getAll = async (req, res) => {
  try {
    const result = await userService.getAll(req.query);
    return res.status(result.statusCode).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};
