require("dotenv").config();
const Server = require("./app/server");

const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

new Server(PORT, DB_URL);
