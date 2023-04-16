const { validationResult } = require("express-validator");
const validationErrorHandler = (req, res, next) => {
  const message = {};
  const errorResult = validationResult(req);
  if (errorResult?.errors.length > 0) {
    errorResult.errors.forEach((error) => {
      message[error.param] = error.msg;
    });
    return res.status(401).send({
      statusCode: res.statusCode,
      success: false,
      error: message,
    });
  }
  next();
};

module.exports = {
  validationErrorHandler,
};
