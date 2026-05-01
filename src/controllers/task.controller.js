const { StatusCodes } = require("http-status-codes");
const TaskService = require("../services/task.service");
const { errorResponse } = require("../utils/response.utils");
const taskService = new TaskService();

module.exports.add = async (req, res) => {
  try {
    const result = await taskService.add(req.body, req.user);
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
    const result = await taskService.update(req.params.id, req.body, req.user);
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

module.exports.delete = async (req, res) => {
  try {
    const result = await taskService.delete(req.params.id, req.user);
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
    const result = await taskService.get(req.params.id);
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
    const result = await taskService.getAll(req.query);
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
