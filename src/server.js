const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const app = express();

//initialization
require("./config/config");

//settings
dotenv.config();

//Database
require("./database");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());
//routes
app.use("/api", require("./controllers/API/routes/user"));
app.use("/api", require("./controllers/API/routes/survey"));

//exports Test
module.exports = app;
