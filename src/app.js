const express = require("express");
const cookies_parser = require("cookie-parser");
const authRoute = require("./Routes/auth.Routes");

const app = express();
app.use(express.json());
app.use(cookies_parser());
app.use("/api/auth",authRoute);
module.exports = app;