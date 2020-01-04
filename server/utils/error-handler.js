class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    console.log("ErrorHandler constructor", statusCode);

    this.statusCode = statusCode;
    this.message = message;
  }
}
const handleError = (err, res) => {
  const { statusCode, message } = err;
  console.log("____handleError code______", statusCode);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message
  });
};

const handlerErrorHelper = (res, err) => {
  res.status(err.statusCode).json({
    status: "error",
    statusCode: err.statusCode,
    message: err.message
  });
};
module.exports = {
  ErrorHandler,
  handleError,
  handlerErrorHelper
};
