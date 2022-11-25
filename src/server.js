const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");

const app = express();

//settings
dotenv.config();

//Database
require("./database/mogodb.connect");

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(passport.initialize());

//routes
app.use("/api/v1", require("./routes/init").authenticationRoutes);
app.use("/api/v1", require("./routes/init").surveyRoutes);

//exports app
module.exports = app;
