import { constants } from "../constants.js";

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation failed!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case constants.UNAUTHORIZED:
      res.json({
        title: "Not authorized!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case constants.NOT_FOUND:
      res.json({
        title: "Not found!",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    case constants.SERVER_ERROR:
      res.json({
        title: "Server error! ",
        message: error.message,
        stackTrace: error.stack,
      });
      break;

    default:
      console.log("No error, everything is working fine!");
      break;
  }
};

export { errorHandler };
