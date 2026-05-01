const { USER } = require("../constants/message");
const userModel = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { verifyToken } = require("../utils/jwt.utils");
const { errorResponse } = require("../utils/response.utils");
const { protectedRoutes } = require("../routes/protected.routes");
const { match } = require("path-to-regexp");

module.exports.authenticate = async (req, res, next) => {
  try {
    const token = await req.headers?.["authorization"]?.split(" ")[1];
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(StatusCodes.UNAUTHORIZED, false, USER.PLEASE_LOGIN),
        );
    }

    const { _id } = await verifyToken(token);
    const user = await userModel.findById(_id);
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(
          errorResponse(StatusCodes.UNAUTHORIZED, false, USER.PLEASE_REGISTER),
        );
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};

module.exports.applyAuthenticate = async (req, res, next) => {
  try {
    const matchRoute = protectedRoutes.find((route) => {
      const isMatch = match(route.path);
      return isMatch(req.path) && route.methods.includes(req.method);
    });

    if (matchRoute) {
      await module.exports.authenticate(req, res, async () => {
        if (matchRoute.roles && !matchRoute.roles.includes(req.user.role)) {
          return res
            .status(StatusCodes.FORBIDDEN)
            .json(errorResponse(StatusCodes.FORBIDDEN, true, USER.NOT_ALLOWED));
        }
        next();
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, true, error.message),
      );
  }
};
