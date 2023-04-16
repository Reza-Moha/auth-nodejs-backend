const { Router } = require("express");
const { authRoute } = require("./auth.router");

const router = Router();

router.use("/auth", authRoute);

module.exports = {
  allRoutes: router,
};
