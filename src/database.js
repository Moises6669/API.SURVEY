const mongoose = require("mongoose");

mongoose
  .connect(process.env.URI_MONGO, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })
  .then((db) => console.log("Connection estabislished with MongoDB"))
  .catch((err) => console.log(err, "error"));
