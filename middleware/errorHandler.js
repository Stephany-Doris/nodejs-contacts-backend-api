import { constants } from "../constants.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode || 500;

  if (constants[statusCode]) {
    res.json({
      title: constants[statusCode],
      message: err.message,
      stackTrace: err.stack,
    });
  }
  
    // console.log("No Error, All good!");

};

export default errorHandler;
