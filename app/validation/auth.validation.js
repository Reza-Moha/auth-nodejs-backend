const { body } = require("express-validator");
const { UserModel } = require("../models/user.model");

const userRegister = () => [
  body("email")
    .isEmail()
    .withMessage("ایمیل وارد شده نامعتبر است")
    .custom(async (email) => {
      if (!email) throw "ایمیل نمی تواند خالی باشد";
      const user = await UserModel.findOne({ email });
      if (user) throw "شما قبلا ثبت نام کرده اید";
      return true;
    }),
  body("userName")
    .isLength({ min: 6, max: 16 })
    .withMessage("نام کاربری حداقل 6 کاراکتر و حداکثر 16 کاراکتر باید باشد")
    .custom(async (userName, context) => {
      if (!userName) throw new Error("نام کاربری نمی تواند خالی باشد");
      const userNameRegex = /^[A-Za-z0-9_]{5,16}$/;
      if (!userNameRegex.test(userName)) throw "نام کاربری نامعتبر است";
      const user = await UserModel.findOne({ userName });
      if (user) throw "نام کابری قبلا در سیستم ثبت شده است";
      return true;
    }),
  body("phoneNumber")
    .isMobilePhone("fa-IR")
    .withMessage("شماره موبایل وارد شده معتبر نمی باشد")
    .custom(async (phoneNumber, context) => {
      if (!phoneNumber) throw "شماره موبایل نمی تواند خالی باشد";
      const user = await UserModel.findOne({ phoneNumber });
      if (user) throw "شما قبلا ثبت نام کرده اید";
      return true;
    }),
  body("password")
    .isLength({ min: 6, max: 16 })
    .withMessage("رمز عبور حداقل 6 کاراکتر و حداکثر 16 کاراکتر باید باشد")
    .custom((password, context) => {
      const confirmPassword = context?.req?.body?.confirmPassword;
      if (!password) throw "رمز عبور نمی تواند خالی باشد";
      if (password !== confirmPassword)
        throw "رمز عبور با تکرار آن یکسان نمی باشد";
      return true;
    }),
];

module.exports = {
  userRegister,
};
