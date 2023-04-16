const { Router } = require("express");
const { AuthController } = require("../http/controller/auth.controller");
const { userRegister } = require("../validation/auth.validation");
const {
  validationErrorHandler,
} = require("../http/middleware/validationErrorHandler");

const router = Router();

router.post(
  "/register",
  userRegister(),
  validationErrorHandler,
  AuthController.register
);

module.exports = {
  authRoute: router,
};
