const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/survey", {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connection estabislished with MongoDB"))
  .catch((err) => console.log(err, "error"));
