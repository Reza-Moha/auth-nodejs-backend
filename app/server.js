const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const http = require("http");
const { allRoutes } = require("./routes/router");
const cors = require("cors");

module.exports = class Server {
  #app = express();
  constructor(PORT, DB_URL) {
    this.connectToDB(DB_URL);
    this.configServer();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }

  createServer(PORT) {
    const server = http.createServer(this.#app);
    server.listen(PORT, () => {
      console.log(`Server is Running on http://localhost:${PORT}`);
    });
    return server;
  }
  async connectToDB(DB_URL) {
    const DB = await mongoose.connect(DB_URL);
    console.log(`Connected To DB`);
    return DB;
  }
  configServer() {
    this.#app.use(
      cors({
        origin: "http://localhost:5173",
      })
    );
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
  }
  createRoutes() {
    this.#app.get("/", (req, res, next) => {
      console.log(req.url);
      res.status(200).send({
        statusCode: res.statusCode,
        success: true,
        message: `NodeJs - Project Manager`,
      });
    });
    this.#app.use(allRoutes);
  }
  errorHandler() {
    this.#app.use((req, res, next) => {
      return res.status(404).send({
        statusCode: res.statusCode,
        success: false,
        message: `page not found on ${req.url}`,
      });
    });
    this.#app.use((error, req, res, next) => {
      const errorStatusCode = error?.status || 500;
      const errorMessage = error?.message || "internal server error";
      return res.status(errorStatusCode).send({
        statusCode: res.statusCode,
        success: false,
        errorMessage,
      });
    });
  }
};
