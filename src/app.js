const express = require("express");
const cookies_parser = require("cookie-parser");
const authRoute = require("./Routes/auth.Routes");
const musicRoute = require("./Routes/music.routes");

const app = express();
app.use(express.json());
app.use(cookies_parser());
app.use("/api/auth",authRoute);
app.use("api/music",musicRoute);
module.exports = app;