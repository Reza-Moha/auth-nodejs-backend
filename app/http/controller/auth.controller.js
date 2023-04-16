const { hashedPassword } = require("../../utils");
const { UserModel } = require("../../models/user.model");

class AuthController {
  async register(req, res, next) {
    try {
      const { userName, email, phoneNumber, password } = req.body;
      const hashed = await hashedPassword(password);
      const createUser = await UserModel.create({
        userName,
        email,
        phoneNumber,
        password: hashed,
      });
      return res.status(201).send({
        statusCode: res.statusCode,
        success: true,
        role: "USER",
        message: "حساب کابری شما با موفقیت ایجاد شد",
        createUser: {
          userName: createUser.userName,
          email: createUser.email,
          login: createUser.lastLogin,
          roles: ["USER"],
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AuthController: new AuthController(),
};
